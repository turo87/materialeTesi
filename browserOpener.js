/**
 * 
 */

const puppeteer = require('puppeteer');

async function open() {
	const browser = await puppeteer.launch({ headless: false });
	return browser;
}
module.exports.open = open;