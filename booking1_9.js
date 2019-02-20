/**
 * 
 */

const puppeteer = require('puppeteer');

const inputJson = [
	{"open": "https://www.booking.com/index.it.html?label=gen173nr-1BCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQGIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;keep_landing=1&sb_price_type=total&"},
	{"scrape": {
		"nameFeature" : "./descendant-or-self::span[@class='sr-hotel__name\n'][1]",
		"buiReviewTitleFeature" : "./descendant-or-self::div[@class='bui-review-score__title'][1]",
		"buiReviewFeature" : "./descendant-or-self::div[@class='bui-review-score__badge'][1]",
		"distFeature" : "./descendant-or-self::span[@class='distfromdest jq_tooltip'][1]",
		"recFeature" : "./descendant-or-self::div[@class='bui-review-score__text'][1]",
		"descFeature" : "./descendant-or-self::div[@class='hotel_desc'][1]"
	}}];

let url = '';
let outputJson = []; //output
let objString = '';

for(var i=0; i<inputJson.length; i++) {
	if(Object.keys(inputJson[i])=="open") {
		url = inputJson[i].open;
	}
	if(Object.keys(inputJson[i])=="scrape") {
		objString = JSON.stringify(inputJson[i].scrape);
	}
}

(async () => {

	//  Let me to listen from console, also within in 'evaluate()' function
	//	page.on('console', msg => console.log('PAGE LOG:', msg.text()));

	const browser = await puppeteer.launch({ headless: true }); // headless mode disabled

	//wait for opening new page
	const page = await browser.newPage();

	//wait for goto url
	await page.goto(url);

	// Type into search box.
	await page.type("#ss", 'Cosenza'); // Types slower, like a user

	// Wait for suggest overlay to appear and click "show all results".
	const allResultsSelector = '.sb-searchbox__button';
	await page.waitForSelector(allResultsSelector);
	await page.click(allResultsSelector);

	// Wait for the results page to load and display the results.
	const resultsSelector = '#hotellist_inner';
	await page.waitForSelector(resultsSelector);

	//selection <Promise<Array<ElementHandle>>> within page
	const hotelsIds = (await page.$x("//div[@data-hotelid]"));

	/*  start to select elements within elementHandle  */
	for(var i=0; i<hotelsIds.length; i++) {
		let jsonObj = JSON.parse(objString);

		var keys = Object.keys(jsonObj);
		for(var j in keys) {
			var key = keys[j];
			var value = jsonObj[key];
			var feature = await hotelsIds[i].$x(value.toString());
			var res = await page.evaluate(el => {
				return el.textContent;
			},feature[0]);
			jsonObj[key] = res;
		}
		outputJson.push(jsonObj);
	}
	/*  end to select elements within elementHandle  */

	// extraction elements
	console.dir(outputJson);

	// close browser
	await browser.close();

})();