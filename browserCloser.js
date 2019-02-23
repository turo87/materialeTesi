/**
 * 
 */

async function close(browser) {
	await browser.close();
}
module.exports.close = close;