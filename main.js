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
		if(scraplManager.isScraplNode(input[i]))			//verifico se è un nodo di tipo 'scrape'
			output = await scraplManager.evalNode(input[i].scrape,currentContext);	
	}
	return output;
}

async function main() {
	await scraplManager.openBrowser();
	for(var i=0; i<test.length; i++) {
		console.log("Testcase: " + (i+1) + "\nJSON aspettato:");
		console.log(testCase.getResults()[i]);
		var obj = await start(test[i]);
		await console.log("JSON restituito: ");
		console.log(JSON.stringify(obj));
	}
	await scraplManager.closeBrowser();
}
(async () => {
	main();
})();