/**
 * 
 */

const puppeteer = require('puppeteer');

let bookingUrl = 'file:///Users/salvatore/Desktop/Booking.com%20%20Hotel%20Cosenza.%20Prenota%20ora%20il%20tuo%20hotel!.html';
(async () => {
	const browser = await puppeteer.launch({ headless: true });
	//apri pagina
	const page = await browser.newPage();
	//aspetto apertura pagina
	await page.goto(bookingUrl);

	/* inizio selezione elementi */
	const allHotelsFatures = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']"));
	const hotelNames = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//span[@class='sr-hotel__name\n']"));
	const hotelBuiReviews = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//div[@class='bui-review-score__badge']/text()"));

	
	for(var i=0; i<hotelNames.length; i++) {
		var featureName = hotelNames[i];
		const name = await page.evaluate(el => {
			return el.textContent;
		},featureName);
		console.log(name);

		for(var j=0; j<allHotelsFatures.length; j++) {

			var hotel = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//span[@class='sr-hotel__name\n']"))[j];
			const valName = await page.evaluate(el => {
				return el.textContent;
			},hotel);
			if(name == valName) {
				console.log("trovato stesso hotel con nome "  + valName);

				var featureBuiReview = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//div[@class='bui-review-score__badge']"))[j];

				if(!(featureBuiReview == undefined)) {
					const buiReview = await page.evaluate(el => {
						return el.textContent;
					},featureBuiReview);
//					console.log(buiReview);
				}
				else {
//					console.log(null);
//					break;
				}
			}
//			if(buiReview == undefined)
//			console.log("null");
//			else {
//			console.log(buiReview);
//			}
		}


	}




	const hotelPrices = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//td//b/text()"));
	for(var i=0; i<hotelPrices.length; i++){
		var featurePrice = hotelPrices[i];
		const price = await page.evaluate(el => {
			return el.textContent;
		},featurePrice);
//		console.log(price);
	}

//	console.log(hotelNames.length);
//	console.log(hotelBuiReviews.length);


	/* fine selezione elementi */



//	var hot = (await page.$x("//div[@data-hotelid='3745331']//div[@class='bui-review-score__badge']/text()"))[0];

//	if(hot == undefined)
//	console.log("null");
//	else {
//	var t = await page.evaluate(el =>  {
//	return el.textContent;
//	},hot);
//	console.log(t);
//	}

//	let hotels = [];
//	// get the hotel elements
//	const hotelsElms = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']"));

//	for(var i=0; i<hotelsElms.length; i++){
//	let hotelJson = {};
//	// get hotel name details
//	const featureName = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//span[@class='sr-hotel__name\n']"))[i];
//	const name = await page.evaluate(el => {
//	return el.textContent;
//	},featureName);
//	// get hotel price details
//	const featurePrice = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//td//b/text()"))[i];
//	var price;
//	if(!(featurePrice == undefined)) {
//	price = await page.evaluate(el => {
//	return el.textContent;
//	},featurePrice);
//	}
//	// get hotel buiReview details
//	const featureBuiReview = (await page.$x("//div[@class='sr_item sr_item_new sr_item_default sr_property_block  sr_flex_layout                 ']//div[@class='bui-review-score__badge']/text()"))[i];
//	var buiReview;
//	if(!(featureBuiReview == undefined)) {
//	buiReview = await page.evaluate(el => {
//	return el.textContent;
//	},featureBuiReview);			
//	} else 
//	buiReview = " ";
//	try {
//	hotelJson.name = name;
//	hotelJson.price = price;
//	hotelJson.buiReview = buiReview;
//	}
//	catch (exception) {
//	}
//	hotels.push(hotelJson);
//	}
//	console.dir(hotels);
	await browser.close();

})();