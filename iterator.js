/**
 * 
 */

const puppeteer = require('puppeteer');

let bookingUrl = 'file:///Users/salvatore/Desktop/Booking.com%20%20Hotel%20Cosenza.%20Prenota%20ora%20il%20tuo%20hotel!.html';
(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(bookingUrl);

	const text = await page.evaluate(() => {
		var iterator = document.evaluate("//span[@class='sr-hotel__name\n']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

//		var b = iterator.iterateNext();
//		console.log(b.textContent);
		
		var a = [];
		
		try {
			var thisNode = iterator.iterateNext();
			
//			var c = thisNode.evaluate("//span", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );


			while (thisNode) {
				a.push( thisNode.textContent );
				thisNode = iterator.iterateNext();
			}	
		}
		catch (e) {
			alert( 'Error: Document tree modified during iteration ' + e );
		}
		return a;
	});

	console.log("text " + text);
    await browser.close();
})();