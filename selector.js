/**
 * 
 */
var output = require('./output.js');


async function selection(obj,page) {

//	(async () => {
//	const browser = await puppeteer.launch({ headless: false });
//	const page = await browser.newPage();
//	await page.goto(url);

	/*  start to select elements within elementHandle  */
	var keys = Object.keys(obj);
	for(var j in keys) {
		var key = keys[j];
		var value = obj[key];
		var feature = await page.$x(value.toString());
		var res = await page.evaluate(el => {
			return el.textContent;
		},feature[0]);
		obj[key] = res;
	}
	/*  end to select elements within elementHandle  */

//	console.log(obj);
//	output.print(obj);
//	})();

	return obj;
}

module.exports.selection = selection;