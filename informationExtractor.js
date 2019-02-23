/**
 * 
 */

async function extract(page,feature) {
	return await page.evaluate(el => {
		return el.textContent;
	},feature);
}
module.exports.extract = extract;