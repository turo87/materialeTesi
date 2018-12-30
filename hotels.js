/**
 * 
 */

const puppeteer = require('puppeteer');

let bookingUrl = 'file:///Users/salvatore/Desktop/Booking.com%20%20Hotel%20Cosenza.%20Prenota%20ora%20il%20tuo%20hotel!.html';
(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
//	await page.setViewport({ width: 1920, height: 926 });
	await page.goto(bookingUrl);


	// get the hotel elements
	const hotelsElms = (await page.$x("//span[@class='sr-hotel__name\n']"));
	console.log(hotelsElms.length);

	let hotels = [];



	for(var i=0; i<hotelsElms.length; i++){
		let hotelJson = {};

		// get hotel name details
		const featureName = (await page.$x("//span[@class='sr-hotel__name\n']"))[i];

		const name = await page.evaluate(el => {
			return el.textContent;
		},featureName);

		try {
			hotelJson.name = name;
		}
		catch (exception) {

		}
		hotels.push(hotelJson);

	}

	console.dir(hotels);
	await browser.close();

})();