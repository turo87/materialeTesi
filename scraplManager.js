/**
 * 
 */
var browserManager = require('./browserManager');
var objectIdentifier = require('./objectIdentifier');

var browser;	//browser (chromium, o altro) che verrà utilizzato per l'apertura delle pagine
var contexts = [];	//context contiene la pila di contesti(tipo la pagina, oppure un nodo della pagina), l'ultimo della pila sarà il contesto di valutazione corrente
var currentContext = {};	//contesto inziale di partenza

//valuta il tipo di azione dell'oggetto 'nodoAzione'
async function evalActionNode(node,currentContext) {
	if(Object.keys(node)=="open") {
		let url = node.open;
		currentContext.page = await browserManager.openPage(browser,url);
		currentContext.currentNode = currentContext.page;
		contexts.push(currentContext);
	}
	if(Object.keys(node)=="type") {
		var objType = Object.values(node);
		var keys = Object.keys(node.type);
		if(keys[0]=="id" && keys[1]=="value") {
			console.log("typing : " + node.type.value);
			if(isStringSelectorCSS(node.type.id)) {
				await currentContext.page.type(node.type.id, node.type.value);
			}
			else {
				var a = await currentContext.page.$x(node.type.id);
				await a[0].type(node.type.value);
			}
		}
	}
	if(Object.keys(node)=="waitUntilPresent") {
		console.log("waiting until present:" + node.waitUntilPresent);
		if(isStringSelectorCSS(node.waitUntilPresent)) {
			await currentContext.page.waitForSelector(node.waitUntilPresent);
		}
		else {
			await currentContext.page.waitForXPath(node.waitUntilPresent);
		}
	}
	if(Object.keys(node)=="click") {
		console.log("clicking: " + node.click);
		if(isStringSelectorCSS(node.click)) {
			await currentContext.page.click(node.click);
		}
		else {
			var a = await currentContext.page.$x(node.click);
			await a[0].click();
		}
	}
}

//se l'oggetto 'node' non è di tipo 'azione' valuto il tipo dell'oggetto 'scrape'
async function evalNode(node,currentContext) {
	
	//identifico il tipo di nodo e richiamo la funzione opportuna per il suo tipo 
	if (node === null) {
		return null;
	}
	if(objectIdentifier.isForeach(node)) {
//		console.log("evalNode isForEach:");
//		console.log(node);
		return await evalForEach(node,currentContext);
	}
	if(objectIdentifier.isObject(node)) {
//		console.log("evalNode isObject:");
//		console.log(node);
		return await evalObject(node,currentContext);		
	}
	if(objectIdentifier.isArray(node)) {
//		console.log("evalNode isArray:");
//		console.log(node);
		return await evalArray(node,currentContext);
	}
//	console.log("evalNode is Atomic value:");
//	console.log(node);
	return await evalAtomicValue(node,currentContext);
}

async function evalForEach(node,currentContext) {
//	console.log("eval FOR EACH");
	var a = [];	//array degli elementi estratti 
	var values = Object.values(node);	//dati dal nodo, e cioè i valori di '_forEach_' e '_extract_'
	var _for = values[0];	//xpath nodo padre
//	console.log(_for);
	var _extract = values[1];	//oggetto '_extract_'
	if(!isStringSelectorCSS(_for)) {		
		var arrayElements = await currentContext.currentNode.$x(_for);	//query dell'elemento padre sulla pagina
	}
	else {
		var arrayElements = await currentContext.currentNode.$$(_for);
	}
//	console.log(arrayElements.length);
	for(var i=0; i<arrayElements.length; i++) {	//itero tutti i nodi della pagina ottenuti tramite la query e li valuto
//		console.log("FOR");
//		console.log(arrayElements[i]);
		var context1 = {};	//1.per ogni nodo della pagina creo un nuovo contesto su cui valutare 
		context1.currentNode = arrayElements[i];	//2.aggiorno l'emento nodo del contesto
		context1.page = currentContext.page;	//3.la pagina rimane la stessa
		contexts.push(context1);	//4.inserisco il contesto nella pila 
		currentContext = contexts[contexts.length-1];	//5.aggiorno il contesto corrente
		var c = await evalNode(_extract,currentContext);	//6.richiamo la 'evalNode' che valuterà il nodo passandogli il contesto corrente
		a.push(c);	//7.inserisco l'estratto nell' array
		contexts.pop();	//8.ho finito, estraggo l'ultimo contesto che non mi serve più
		currentContext = contexts[contexts.length-1];	//9.aggiorno il contesto a quello precedente
	}

//	for(var i=0; i<arrayElements.length; i++) {
//	var c = await arrayElements[i].$eval(_extract.name , el => el.innerText);
//	console.log(c);
//	}

	return await a;
}

async function evalArray(node,currentContext) {
//	console.log("evalArray:");
//	console.log(node);
	var out = [];
	if(objectIdentifier.isSelectorStringArray(node)) {	//verifico che si tratti di una struttura di tipo 'selettore Array'
		//in questo caso avrò un unica stringa all'interno dell'array e quindi
//		console.log(node);	//valuto direttamente il valore atomico all'interno del contesto apportuno
		if(!isStringSelectorCSS(node[0])) {
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
		}
		else {
			var array =  await currentContext.page.$$eval(node[0], nodes => nodes.map(n => n.innerText));
			for(var j=0; j<array.length; j++)
				out.push(array[j]);
		}
		return await out;
	}

	else {
//		console.log("ELSE");
		//qualora non fosse un 'selettore Array', allora avrò un array					
		//di valori atomici(oppure oggetti o array) da valutare
		for(var j=0; j<node.length; j++) {	//all'interno del proprio contesto tramite 'evalNode'
			if(!isStringSelectorCSS(node[j])) {
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
			else {
				var c = await evalNode(node[j], currentContext);
				out.push(c);
			}
		}
		return await out;
	}
}

async function evalObject(node,currentContext) {
//	console.log("evalObject");
//	console.log(node);
	var out = {};
	var keys1 = Object.keys(node);
	if(objectIdentifier.isForeach(node[keys1[0]]) ) {	//verifico anzitutto se il nodo interno è di tipo '_forEach_'
		return await evalNode(node[keys1[0]],currentContext);	//in questo caso chiamo la funzione che mi valuta il nodo ed esco
	}
	for(var j in keys1) {	//altrimenti:
		if(objectIdentifier.isObject(node[keys1[j]])) {	//1.il nodo più interno è un oggetto, chiamo la funzione 'evalNode'
//			console.log("IF");	//e gli passo il nodo (quello interno al nodo corrente)
			var obj = {};
			obj = await evalNode(node[keys1[j]],currentContext);
			out[keys1[j]] = obj;
		}
		else if(objectIdentifier.isArray(node[keys1[j]])) {	//2.il nodo interno è un array quindi richiamo la 'evalNode' 
//			console.log("IF");	//passandogli il nodo interno che valuterà se si tratta 
			var obj = {};	//di un array(oppure di un selettore array)
			obj = await evalNode(node[keys1[j]],currentContext);
			out[keys1[j]] = obj;
		}
		else {	//3.il nodo è un valore atomico quindi richiamo 'evalNode' 
//			console.log("ELSE");	//per valutarlo
//			console.log(node[keys1[j]]);
			if(!isStringSelectorCSS(node[keys1[j]])) {
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
			else
				out[keys1[j]] = await evalNode(node[keys1[j]],currentContext);
		}
	}
	return out;
}

async function evalAtomicValue(selector,currentContext) {
//	console.log("evalAtomicValue:");
//	console.log(selector);
	if(!isStringSelectorCSS(selector)) {
		try {
			var d = await currentContext.page.evaluate(el => {	//Ho trovato un selettore quindi lo valuto all'interno del suo contesto
				return el.textContent;	//facendo una query sulla pagina
			},currentContext.currentNode);
			return d;		
		} catch (exception) {
			return null;
		}
	}
	else {
		try {
//			console.log("innerTEXT: ");
//			console.log(currentContext.currentNode);
			var c = await currentContext.currentNode.$eval(selector , el => el.innerText);
			return c;
		} catch (exception) {
			return null;
		}
	}
}

async function openBrowser() {
	browser = await browserManager.openBrowser();
}

async function closeBrowser() {
	await browserManager.close(browser);
}

function isActionNode(obj) {
	if(!isScraplNode(obj))
		return true;
	return false;
}

function isScraplNode(obj) {
	if(Object.keys(obj)=="scrape")
		return true;
	return false;
}

function isStringSelectorCSS(obj) {

//	if(objectIdentifier.isSelectorStringArray(obj)) {
//	return isStringSelectorCSS(obj[0]);
//	}

//	console.log("isStringSelectorCSS");
//	console.log(obj);
	if(obj[0]=='/')
		return false;
	if(obj[0]=='.' && obj[1]=='/')
		return false;
	if(obj[0]=='[' && obj[1]=='"' && obj[2]=='/')
		return false;
	if(obj[0]=='[' && obj[1]=="'" && obj[2]=='/')
		return false;
	if(obj[0]=='[' && obj[1]=="'" && obj[2]=='.' && obj[3]=='/')
		return false;
	if(obj[0]=='[' && obj[1]=='"' && obj[2]=='.' && obj[3]=='/')
		return false;


	if(obj[0]=='"' && obj[1]=='/')
		return false;
	if(obj[0]=="'" && obj[1]=='/')
		return false;
	if(obj[0]=="'" && obj[1]=='.' && obj[2]=='/')
		return false;
	if(obj[0]=='"' && obj[1]=='.' && obj[2]=='/')
		return false;



	return true;
}

module.exports.openBrowser = openBrowser;
module.exports.closeBrowser = closeBrowser;
module.exports.isActionNode = isActionNode;
module.exports.isScraplNode = isScraplNode;
module.exports.evalActionNode = evalActionNode;
module.exports.evalNode = evalNode;