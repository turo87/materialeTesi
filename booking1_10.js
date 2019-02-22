/**
 * 
 */

const puppeteer = require('puppeteer');

const inputJson = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape": {
		"name" : "//*[@class='hp__hotel-name']",
		"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']"
	}}];

let url = '';
let obj = {};

for(var i=0; i<inputJson.length; i++) {
	if(Object.keys(inputJson[i])=="open") {
		url = inputJson[i].open;
	}
	if(Object.keys(inputJson[i])=="scrape") {
		obj = inputJson[i].scrape;
	}
}

(async () => {

	const browser = await puppeteer.launch({ headless: true }); // headless mode disabled
	const page = await browser.newPage();
	await page.goto(url);

	// Wait for the results page to load and display the results.
//	const resultsSelector = '#right';
//	await page.waitForSelector(resultsSelector);

	/*  start to select elements within elementHandle  */
	var keys = Object.keys(obj);
	for(var j in keys) {
		var key = keys[j];
		var value = obj[key];
		var feature = await page.$x(value.toString());
		var res = await page.evaluate(el => {
			return el.textContent;
		},feature[0]);
		obj[key] = res;
	}
	/*  end to select elements within elementHandle  */

	// extraction elements
	console.dir(obj);

	// close browser
	await browser.close();

})();