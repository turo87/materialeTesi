/**
 * 
 */

const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/index.it.html?label=gen173nr-1BCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQGIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;keep_landing=1&sb_price_type=total&';
(async () => {

	// Let me to listen from console, also within in 'evaluate()' function
//	page.on('console', msg => console.log('PAGE LOG:', msg.text()));

	const browser = await puppeteer.launch({ headless: true }); // headless mode disabled

	//wait for opening new page
	const page = await browser.newPage();

	//wait for goto url
	await page.goto(bookingUrl);

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
//	console.log("lunghezza array di tutti gli hotel trovati: " + hotelsIds.length);

	var hotels = [];

	/*  start to select elements within elementHandle  */

	for(var i=0; i<hotelsIds.length; i++) {
		var hotelJson = {};
		var nameFeature = await hotelsIds[i].$x("./descendant-or-self::span[@class='sr-hotel__name\n'][1]");
		var name = await page.evaluate(el => {
			return el.textContent;
		},nameFeature[0]);
//		console.log(name);
		hotelJson.name = name;

		var buiReviewFeature = await await hotelsIds[i].$x("./descendant-or-self::div[@class='bui-review-score__badge'][1]");
		try {
			var buiReview = await page.evaluate(el => {
				return el.textContent;
			},buiReviewFeature[0]);
//			console.log(buiReview);
			hotelJson.bui = buiReview;
		} catch (exception) {
//			console.log("NULL");
			hotelJson.bui = " ";
		}
		hotels.push(hotelJson);
	}

	/*  end to select elements within elementHandle  */

	// extraction elements
	hotels.forEach((hotelElement) => {
		console.log(hotelElement.name + " " + hotelElement.bui);
	})

//	console.dir(hotels);
	await browser.close();

})();