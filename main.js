/**
 * 
 */

//--- import funzioni di supporto
var testCase = require('./testCase');
var scraplManager = require('./scraplManager');
//---

var currentContext = {};	//contesto inziale di partenza
const test = testCase.getTestCase();	//Input: Array di input importati dalla funzione di supporto testCase
let output;	//Output: oggetto terminale restituito

async function start(input) {
	output = {};
	for(var i=0; i<input.length; i++) {		//itero l'input e valuto ogni nodo 
		if(scraplManager.isActionNode(input[i]))			//verifico se è un nodo di tipo 'azione'
			await scraplManager.evalActionNode(input[i],currentContext);
		if(scraplManager.isScraplNode(input[i])) {
			console.log("extracting data..");
			output = await scraplManager.evalNode(input[i].scrape,currentContext);	
		}			//verifico se è un nodo di tipo 'scrape'
	}
	return output;
}

function hex2a(hexx) {
//	console.log("HEXX: " + hexx);
	var hex = hexx.toString();//force conversion
//	console.log("HEX: " + hex);

	var str = '';
	for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
//	console.log("STR: " + str);
	return str;
}

async function main(inp) {
//	console.log("inp MAIN: ");
//	console.log(inp);
	var s1 = inp.substr(7, inp.length);
//	console.log(s1);

	var c = "";
	var split = s1.split("+");
	for(var i=0; i<split.length; i++) {
		c += split[i].trim();
	}
//	console.log( "MAIN: " + c);

	await scraplManager.openBrowser();
	var obj = await start(JSON.parse(c));
	console.log(JSON.stringify(obj,undefined,2));
	await console.log("..i'm waiting for closing browser")
	await scraplManager.closeBrowser();

	return obj;
}

module.exports.main = main;
