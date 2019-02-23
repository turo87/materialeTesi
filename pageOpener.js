/**
 * 
 */

async function open(browser,url) {
	const page = await browser.newPage();
	await page.goto(url);
	return page;
}
module.exports.open = open;