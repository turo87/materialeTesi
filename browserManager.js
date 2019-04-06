/**
 * 
 */

const puppeteer = require('puppeteer');

async function openBrowser() {
	const browser = await puppeteer.launch({ headless: true });
	await console.log("opening browser");
	return browser;
}

async function openPage(browser,url) {
	const currentNode = await browser.newPage();
	await console.log("opening a page..");
	await currentNode.goto(url);
	await console.log("going to url: " + url);
	return currentNode;
}

async function close(browser) {
	await console.log("browser was closed")
	await browser.close();
}

module.exports.openBrowser = openBrowser;
module.exports.openPage = openPage;
module.exports.close = close;
