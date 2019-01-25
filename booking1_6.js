/**
 * 
 */

const puppeteer = require('puppeteer');

let bookingUrl = 'https://www.booking.com/searchresults.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM&sid=9e5a2f72fb374b24b8be4033628b9dd1&sb=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.it.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM%3Bsid%3D9e5a2f72fb374b24b8be4033628b9dd1%3Bsb_price_type%3Dtotal%26%3B&ss=cosenza&is_ski_area=0&checkin_year=2019&checkin_month=5&checkin_monthday=1&checkout_year=2019&checkout_month=5&checkout_monthday=2&no_rooms=1&group_adults=2&group_children=0&b_h4u_keep_filters=&from_sf=1';
(async () => {

	// Let me to listen from console, also within in 'evaluate()' function
//	page.on('console', msg => console.log('PAGE LOG:', msg.text()));

	const browser = await puppeteer.launch({ headless: true }); // headless mode disabled

	//wait for opening new page
	const page = await browser.newPage();

	//wait for goto url
	await page.goto(bookingUrl);

	// Wait for the results page to load and display the results.
	const resultsSelector = '#hotellist_inner';
	await page.waitForSelector(resultsSelector);

	//selection <Promise<Array<ElementHandle>>> within page
	const hotelsIds = (await page.$x("//div[@data-hotelid]"));
//	console.log("lunghezza array di tutti gli hotel trovati: " + hotelsIds.length);

	var hotels = [];

	/*  start to select elements within elementHandle  */
//	for(var i=0; i<hotelsIds.length; i++) {
	for(var i=0; i<2; i++) {

		var hotelJson = {};
		var nameFeature = await hotelsIds[i].$x("./descendant-or-self::span[@class='sr-hotel__name\n'][1]");
		var name = await page.evaluate(el => {
			return el.textContent;
		},nameFeature[0]);
//		console.log(name);
		hotelJson.name = name;

		var hrefFeature = await hotelsIds[i].$x("./descendant-or-self::a[@class='b-button b-button_primary sr_cta_button']/@href[1]");
		try {
			var availableRooms = [];
			var h = await page.evaluate(el => {
				return el.textContent;
			},hrefFeature[0]);
			var link = "https://www.booking.com"+h;
			const browser2 = await puppeteer.launch({ headless: true }); // headless mode disabled

			//wait for opening new page
			const page2 = await browser2.newPage();

			//wait for goto url
			await page2.goto(link);

			// Wait for the results page to load and display the results.
			const resultsSelector2 = '#hp_availability_style_changes';
			await page2.waitForSelector(resultsSelector2);

			var rooms = await page2.$x("//span[@class='hprt-roomtype-icon-link ']");
			for(var j=0; j<rooms.length; j++) {
				var r = await page2.evaluate(el => {
					return el.textContent;
				},rooms[j]);
				availableRooms.push(r);
//				console.log("rooms: " + r);
			}
			hotelJson.availableRooms = availableRooms;
//			console.dir(availableRooms);
			await browser2.close();
		} catch(exception) {
			console.log("NULL");
		}
		hotels.push(hotelJson);
	}
	/*  end to select elements within elementHandle  */

//	extraction elements
//	hotels.forEach((hotelElement) => {
//		console.log(hotelElement.name);
//		console.log(hotelElement.availableRooms);
//	});

	console.dir(hotels);
	await browser.close();

})();