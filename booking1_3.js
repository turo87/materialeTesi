/**
 * 
 */


const puppeteer = require('puppeteer');

let bookingUrl = 'file:///Users/salvatore/Desktop/Booking.com%20%20Hotel%20Cosenza.%20Prenota%20ora%20il%20tuo%20hotel!.html';
(async () => {
	const browser = await puppeteer.launch({ headless: true });
	//wait for opening new page
	const page = await browser.newPage();
	//wait for goto url
	await page.goto(bookingUrl);

	//let me to listen from console, also within in 'evaluate()' function
//	page.on('console', msg => console.log('PAGE LOG:', msg.text()));


	/*    start to select elements from the page    */


	//selection <Promise<Array<ElementHandle>>>
	const hotelsIds = (await page.$x("//div/@data-hotelid"));
//	console.log("lunghezza array di tutti gli hotel trovati: " + hotelsIds.length);

	var hotels = [];


	for(var i=0; i<hotelsIds.length; i++) {

		var hotelJson = {};

		var id = await page.evaluate(el => {
			return el.textContent;
		},hotelsIds[i]);
//		console.log(id);

		var nameFeature = await page.$x("//span[@class='sr-hotel__name\n']");
		var name = await page.evaluate(el => {
			return el.textContent;
		},nameFeature[i]);
//		console.log(name);
		hotelJson.name = name;

		var buiReviewFeature = await page.$x("//div[@data-hotelid='" + id +"']//div[@class='bui-review-score__badge']");
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

	hotels.forEach((hotelElement) => {
		console.log(hotelElement.name + " " + hotelElement.bui);
	})

//	console.dir(hotels);
	await browser.close();

})();