/**
 * 
 */

//--- import funzioni di supporto
var browserOpener = require('./browserOpener.js');
var pageOpener = require('./pageOpener.js');
var browserCloser = require('./browserCloser');
var testCase = require('./testCase.js');
//---

//--- variabili utili per il riconoscimento del tipo di oggetti e selettori (array, oggetto(JSON))
var arrayConstructor = [].constructor; 
var objectConstructor = {}.constructor;
//---

var browser; 	// browser (chromium, o altro) che verrà utilizzato per l'apertura delle pagine
var contexts = [];	//	context contiene la pila di contesti(tipo la pagina, oppure un nodo della pagina), l'ultimo della pila sarà il contesto di valutazione corrente
var currentContext = {}; // contesto inziale di partenza
const test = testCase.getTestCase();	//Input: Array di input importati dalla funzione di supporto testCase
let output;	//Output: oggetto terminale restituito

async function start(input) {
	output = {};
	for(var i=0; i<input.length; i++) {		// itero l'input e valuto ogni nodo 
		if(isActionNode(input[i]))			//	verifico se è un nodo di tipo 'azione'
			await evalActionNode(input[i],currentContext);		
		if(isScraplNode(input[i]))			//	verifico se è un nodo di tipo 'scrape'
			output = await evalNode(input[i].scrape,currentContext);	
	}
	return output;
}

//valuta il tipo di azione dell'oggetto 'nodoAzione'
async function evalActionNode(node,currentContext) {
	let url = node.open;
	currentContext.page = await pageOpener.open(browser,url);
	currentContext.currentNode = currentContext.page;
	contexts.push(currentContext);
}

//se l'oggetto 'node' non è di tipo 'azione' valuto il tipo dell'oggetto 'scrape'
async function evalNode(node,currentContext) {

	//	identifico il tipo di nodo e richiamo la funzione opportuna per il suo tipo 

	if (node === null) {
		return null;
	}
	if(isForeach(node)) {
//		console.log("evalNode isForEach:");
//		console.log(node);

		return await evalForEach(node,currentContext);
	}
	if(isObject(node)) {
//		console.log("evalNode isObject:");
//		console.log(node);
		return await evalObject(node,currentContext);		
	}
	if(isArray(node)) {
//		console.log("evalNode isArray:");
//		console.log(node);

		return await evalArray(node,currentContext);
	}
//	console.log("evalNode is Atomic value:");
//	console.log(node);

	return await evalAtomicValue(node,currentContext);
}

async function evalForEach(node,currentContext) {
	var a = [];							//	array degli elementi estratti 
	var values = Object.values(node);	//	dati dal nodo, e cioè i valore di '_forEach_' e '_extract_'
	var _for = values[0];				//	xpath nodo padre
	var _extract = values[1]; 			//	oggetto '_extract_'
	var arrayElements = await currentContext.currentNode.$x(_for);	// query dell'elemento padre sulla pagina
//	console.log(arrayElements.length);
	for(var i=0; i<arrayElements.length; i++) {		//	itero tutti i nodi della pagina ottenuti tramite la query e li valuto
		var context1 = {};							//	1.per ogni nodo della pagina creo un nuovo contesto su cui valutare 
		context1.currentNode = arrayElements[i];	//	2.aggiorno l'emento nodo del contesto
		context1.page = currentContext.page;		//	3.la pagina rimane la stessa
		contexts.push(context1);					//	4.inserisco il contesto nella pila 
		currentContext = contexts[contexts.length-1];	//	5.aggiorno il contesto corrente
		var c = await evalNode(_extract,currentContext);//	6.richiamo la 'evalNode' che valuterà il nodo passandogli il contesto corrente
		a.push(c);										//	7.inserisco l'estratto nell' array
		contexts.pop();									//	8.ho finito, estraggo l'ultimo contesto che non mi serve più
		currentContext = contexts[contexts.length-1];	//	9.aggiorno il contesto a quello precedente
	}
	return await a;
}
async function evalArray(node,currentContext) {
//	console.log("evalArray:");
//	console.log(node);
	if(isSelectorStringArray(node)) {							//	verifico che si tratti di una struttura di tipo 'selettore Array'
//		console.log("evalArry isSelector String:");				//	in questo caso avrò un unica stringa all'interno dell'array e quindi
//		console.log(node);										//	valuto direttamente il valore atomico all'interno del contesto apportuno
		var out = [];
		var array = await currentContext.currentNode.$x(node);
		for(var j=0; j<array.length; j++) {
			var context1 = {};
			context1.currentNode = array[j];
			context1.page = currentContext.page;
			contexts.push(context1);
			currentContext = contexts[contexts.length-1];
			var c = await evalNode(node[0], currentContext);
			out.push(c);
			contexts.pop();
			currentContext = contexts[contexts.length-1];
		}
		return await out;
	}
	else {														//	qualora non fosse un 'selettore Array', allora avrò un array					
		var out = [];											//	di valori atomici(oppure oggetti o array) da valutare
		for(var j=0; j<node.length; j++) {						//	all'interno del proprio contesto tramite 'evalNode'
			var array = await currentContext.currentNode.$x(node[j]);
			var context1 = {};
			context1.currentNode = array[0];
			context1.page = currentContext.page;
			contexts.push(context1);
			currentContext = contexts[contexts.length-1];
			var c = await evalNode(node[j], currentContext);
			out.push(c);
			contexts.pop();
			currentContext = contexts[contexts.length-1];
		}
		return await out;
	}


}
async function evalObject(node,currentContext) {
//	console.log("evalObject");
//	console.log(node);
	var out = {};
	var keys1 = Object.keys(node);
	if(isForeach(node[keys1[0]]) ) {									//	verifico anzitutto se il nodo interno è di tipo '_forEach_'
		return await evalNode(node[keys1[0]],currentContext);			//	in questo caso chiamo la funzione che mi valuta il nodo ed esco
	}
	for(var j in keys1) {												//	altrimenti:
		if(isObject(node[keys1[j]])) {									//	1.il nodo più interno è un oggetto, chiamo la funzione 'evalNode'
//			console.log("IF");											//		e gli passo il nodo (quello interno al nodo corrente)
			var obj = {};
			obj = await evalNode(node[keys1[j]],currentContext);
			out[keys1[j]] = obj;
		}
		else if(isArray(node[keys1[j]])) {								//	2.il nodo interno è un array quindi richiamo la 'evalNode' 
//			console.log("IF");											//		passandogli il nodo interno che valuterà se si tratta 
			var obj = {};												//		di un array(oppure di un selettore array)
			obj = await evalNode(node[keys1[j]],currentContext);
			out[keys1[j]] = obj;
		}
		else {															//	3.il nodo è un valore atomico quindi richiamo 'evalNode' 
//			console.log("ELSE");										//		per valutarlo
//			console.log(node[keys1[j]]);
			var array = await currentContext.currentNode.$x(node[keys1[j]]);

			var context1 = {};
			context1.currentNode = array[0];
			context1.page = currentContext.page;
			contexts.push(context1);
			currentContext = contexts[contexts.length-1];
			out[keys1[j]] = await evalNode(node[keys1[j]],currentContext);
			contexts.pop();
			currentContext = contexts[contexts.length-1];
		}
	}
	return out;
}
async function evalAtomicValue(selector,currentContext) {
//	console.log("evalAtomicValue:");
//	console.log(selector);
	try {
		var d = await currentContext.page.evaluate(el => {		//	Ho trovato un selettore quindi lo valuto all'interno del suo contesto
			return el.textContent;								// facendo una query sulla pagina
		},currentContext.currentNode);
		return d;		
	} catch (exception) {
		return null;
	}
}
function isSelectorString(selector) {
//	console.log("is selectorString:");
//	console.log(selector);
	if (!isSelectorStringArray(selector)) {
//		console.log("YES");
		return true;
	}
//	console.log("NO");
	return false;
}
function isSelectorStringArray(selector) {
//	console.log("is Selector String Arrray:");
//	console.log(selector);
//	console.log(selector.length);
	if (selector.constructor === arrayConstructor && selector.length == 1 ) {
//		console.log("YES");
		return true;
	}
//	console.log("NO");
	return false;
}

function isObject(node) {
	if (node.constructor === objectConstructor) {
		return true;
	}
	return false;
}
function isArray(node) {
	if (node.constructor === arrayConstructor) {
		return true;
	}
	return false;
}
function isActionNode(obj) {
	if(Object.keys(obj)=="open")
		return true;
	return false;
}
function isScraplNode(obj) {
	if(Object.keys(obj)=="scrape")
		return true;
	return false;
}
function isForeach(obj) {
	if(Object.keys(obj)[0]=="_forEach_" && Object.keys(obj)[1]=="_extract_") {
		return true;
	}
	return false;
}
async function main() {
	browser = await browserOpener.open();
	for(var i=0; i<test.length; i++) {
		console.log("Testcase: " + (i+1) + "\nJSON aspettato:");
		console.log(testCase.getResults()[i]);
		var obj = await start(test[i]);
		await console.log("JSON restituito: ");
		console.log(JSON.stringify(obj));
	}
	await browserCloser.close(browser);
}
(async () => {
	main();
})();