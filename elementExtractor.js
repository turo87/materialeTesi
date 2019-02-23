/**
 * 
 */

async function extract(page,el) {
	return await page.$x(el);
}
module.exports.extract = extract;