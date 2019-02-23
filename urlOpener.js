/**
 * 
 */

const puppeteer = require('puppeteer');

async function open() {

//	(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
//	await page.goto(url);

	return browser;
}

module.exports.open = open;