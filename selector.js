/**
 * 
 */

async function selection(obj,page) {
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
	return obj;
}
module.exports.selection = selection;