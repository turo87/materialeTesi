/**
 * 
 */

const puppeteer = require('puppeteer');

async function open() {
	const browser = await puppeteer.launch({ headless: true });
	return browser;
}
module.exports.open = open;