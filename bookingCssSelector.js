/**
 * 
 */
const puppeteer = require('puppeteer');

let bookingUrl = 'file:///Users/salvatore/Desktop/Booking.com%20%20Hotel%20Cosenza.%20Prenota%20ora%20il%20tuo%20hotel!.html';
(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 926 });
	await page.goto(bookingUrl);

	// get hotel details
	let hotelData = await page.evaluate(() => {
		let hotels = [];
		// get the hotel elements
		let hotelsElms = document.querySelectorAll('div.sr_item_default[data-hotelid]');

		// get the hotel data
		hotelsElms.forEach((hotelelement) => {
			let hotelJson = {};
			try {
				hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
				hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
				hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
				if(hotelelement.querySelector('strong.price')){
					hotelJson.price = hotelelement.querySelector('strong.price').innerText;
				}
			}
			catch (exception){

			}
			hotels.push(hotelJson);
		});
		return hotels;
	});

	console.dir(hotelData);
})();