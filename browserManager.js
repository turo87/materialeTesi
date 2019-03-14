/**
 * 
 */

const puppeteer = require('puppeteer');

async function openBrowser() {
	const browser = await puppeteer.launch({ headless: false });
	return browser;
}

async function openPage(browser,url) {
	const currentNode = await browser.newPage();
	await currentNode.goto(url);
	return currentNode;
}

async function close(browser) {
	await browser.close();
}

module.exports.openBrowser = openBrowser;
module.exports.openPage = openPage;
module.exports.close = close;
