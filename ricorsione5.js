/**
 * 
 */
var browserOpener = require('./browserOpener.js');
var pageOpener = require('./pageOpener.js');
var browserCloser = require('./browserCloser');
var arrayConstructor = [].constructor;
var objectConstructor = {}.constructor;


//Input: Array INP
const input = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":[
		{"name" : "//*[@class='hp__hotel-name']",
			"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']"}]}];

//Output: Object OUT
let output;

async function main(inputJson) {
	output = {};
//	context contiene il contesto di valutazione corrente, tipo la pagina
	var context = {};
	for(var i=0; i<input.length; i++) {
		if(isActionNode(input[i]))
			await evalActionNode(input[i],context);			
		if(isScraplNode(input[i]))
			output = await evalNode(input[i].scrape,context);
	}
	await browserCloser.close(context.page);
	return output;
}
async function evalActionNode(node,context){
	let url = node.open; 
	context.page = await browserOpener.open();
	context.currentNode = await pageOpener.open(context.page,url);
}
async function evalNode(node,context) {
	if (node === null) {
		return null;
	}
	if(isObject(node)) {
		return await evalObject(node,context);		
	}
	if(isArray(node)) {
		return await evalArray(node,context);
	}
	return await evalAtomicValue(node,context);
}

async function evalArray(node,context) {
	for(var i=0; i<node.length; i++) {
		node[i] = await evalNode(node[i],context);
	}
	return node;
}
async function evalObject(node,context) {
//	console.log("evalObject:");
//	console.log(node);
	var out = {};
//	ricorsione su ogni key
	var keys = Object.keys(node);
	for(var j in keys) {
		var key = keys[j];
		var value = node[key].toString();
		out[key] = await evalNode(value,context);
	}
	return out;
}
async function evalAtomicValue(selector,context) {
//	execute the selector xpath on the current page
	var c = await context.currentNode.$x(selector);
	var d = await context.currentNode.evaluate(el => {
		return el.textContent;
	},c[0]);
	return d;
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
(async () => {
	var m = await main(input);
	await console.log("OUT: ");
	await console.log(m);
})();
