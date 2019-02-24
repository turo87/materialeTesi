/**
 * 
 */

async function evaluate(page,feature) {
	return await page.evaluate(el => {
		return el.textContent;
	},feature);
}
module.exports.evaluate = evaluate;