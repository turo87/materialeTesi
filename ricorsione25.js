/**
 * 
 */
var browserOpener = require('./browserOpener.js');
var pageOpener = require('./pageOpener.js');
var browserCloser = require('./browserCloser');
var testCase = require('./testCase.js');
var arrayConstructor = [].constructor;
var objectConstructor = {}.constructor;
var browser;
var contexts = [];
var currentContext = {};
const test = testCase.getTestCase();	//Input: Array INP
let output;	//Output: Object OUT

async function main(input) {
	output = {};
//	context contiene il contesto di valutazione corrente, tipo la pagina
	for(var i=0; i<input.length; i++) {
		if(isActionNode(input[i]))
			await evalActionNode(input[i],currentContext);			
		if(isScraplNode(input[i]))
			output = await evalNode(input[i].scrape,currentContext);
	}
	return output;
}
async function evalActionNode(node,currentContext) {
	let url = node.open;
	currentContext.page = await pageOpener.open(browser,url);
	currentContext.currentNode = currentContext.page;
	contexts.push(currentContext);
}
async function evalNode(node,currentContext) {
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
	var a = [];
	var values = Object.values(node);
	var _for = values[0];
	var arrayElements = await currentContext.currentNode.$x(_for);
//	console.log(arrayElements.length);
	var _extract = values[1];
	for(var i=0; i<arrayElements.length; i++) {
		var context1 = {};
		context1.currentNode = arrayElements[i];
		context1.page = currentContext.page;
		contexts.push(context1);
		currentContext = contexts[contexts.length-1];
		var c = await evalNode(_extract,currentContext);
		a.push(c);
		contexts.pop();
		currentContext = contexts[contexts.length-1];
	}
	return await a;
}
async function evalArray(node,currentContext) {
//	console.log("evalArray:");
//	console.log(node);
	if(isSelectorStringArray(node)) {
//		console.log("evalArry isSelector String:");
//		console.log(node);
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
	else {
		var out = [];
		for(var j=0; j<node.length; j++) {
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
	if(isForeach(node[keys1[0]]) ) {
		return await evalNode(node[keys1[0]],currentContext);
	}
	for(var j in keys1) {
		if(isObject(node[keys1[j]])) {
//			console.log("IF");
			var obj = {};
			obj = await evalNode(node[keys1[j]],currentContext);
			out[keys1[j]] = obj;
		}
		else if(isArray(node[keys1[j]])) {
//			console.log("IF");
			var obj = {};
			obj = await evalNode(node[keys1[j]],currentContext);
			out[keys1[j]] = obj;
		}
		else {
//			console.log("ELSE");
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
		var d = await currentContext.page.evaluate(el => {
			return el.textContent;
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
async function start() {
	browser = await browserOpener.open();
	for(var i=0; i<test.length; i++) {
		console.log("Testcase: " + (i+1) + "\nJSON aspettato:");
		console.log(testCase.getResults()[i]);
		var m = await main(test[i]);
		await console.log("JSON restituito: ");
		console.log(JSON.stringify(m));
//		console.log(m);
	}
	await browserCloser.close(browser);
}
(async () => {
	start();
})();