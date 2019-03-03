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


//Input: Array INP
const test = testCase.main();

//Output: Object OUT
let output;

var contexts = [];
var currentContext = {};

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
async function evalActionNode(node,currentContext){
	let url = node.open;
	currentContext.page = await pageOpener.open(browser,url);
	currentContext.currentNode = currentContext.page;
	contexts.push(currentContext);
}
async function evalNode(node,currentContext) {
	if (node === null) {
		return null;
	}
	if(isObject(node)) {
		return await evalObject(node,currentContext);		
	}
	if(isArray(node)) {
		return await evalArray(node,currentContext);
	}
	return await evalAtomicValue(node,currentContext);
}

async function evalArray(node,currentContext) {
	var out = [];
	for(var j=0; j<node.length; j++) {
		var array = await currentContext.currentNode.$x(node[j]);
		for(var i=0; i<array.length; i++) {
			var context1 = {};
			context1.currentNode = array[i];
			context1.page = currentContext.page;
			contexts.push(context1);
			currentContext = context1;
			var d = await evalNode(node[j], currentContext);
			contexts.pop();
			currentContext = contexts[contexts.length-1];
			await out.push(d);
		}
	}
	return await out;
}
async function evalAtomicValue(selector,currentContext) {
	console.log("isAtomicValue:");
	console.log(selector);
	var c = await currentContext.currentNode.$x(selector);
	var d = await currentContext.page.evaluate(el => {
		return el.textContent;
	},c[0]);
	return d;
}
async function evalObject(node,currentContext) {
	console.log("evalObject:");
	console.log(node);
	var out = {};
//	ricorsione su ogni key
	var keys = Object.keys(node);
	for(var j in keys) {
		var key = keys[j];
//		var value = node[key].toString();
		out[key] = await evalNode(node[key],currentContext);
	}
	return out;
}
function isObject(node) {
	console.log("isObject:");
	console.log(node);
	if (node.constructor === objectConstructor) {
		console.log("YES");
		return true;
	}
	console.log("NO");
	return false;
}
function isArray(node) {
	console.log("isArray:");
	console.log(node);
	if (node.constructor === arrayConstructor) {
		console.log("Yes");
		return true;
	}
	console.log("NO");
	return false;
}
function isScraplNode(obj) {
	if(Object.keys(obj)=="scrape")
		return true;
	return false;
}
function isActionNode(obj) {
	if(Object.keys(obj)=="open")
		return true;
	return false;
}

async function start() {
	console.log("numero testcase:");
	console.log(test.length);
	browser = await browserOpener.open();
	for(var i=0; i<test.length; i++) {
		console.log("Valore aspettato:");
		console.log(testCase.getResults()[i]);
		var m = await main(test[i]);
		await console.log("OUT: ");
//		await console.log(JSON.stringify(m));
		console.log(m);
	}
	await browserCloser.close(browser);
}

(async () => {
	start();
})();
