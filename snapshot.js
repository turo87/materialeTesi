/**
 * 
 */

const puppeteer = require('puppeteer');

let bookingUrl = 'file:///Users/salvatore/Desktop/Booking.com%20%20Hotel%20Cosenza.%20Prenota%20ora%20il%20tuo%20hotel!.html';
(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(bookingUrl);

	page.on('console', msg => console.log('PAGE LOG:', msg.text()));
	await page.evaluate(() => {
		
//		console.log('ciao') 
		
		var nodesSnapshot = document.evaluate("//span[@class='sr-hotel__name\n']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


		var a = [];

		for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		{
			console.log( i + " " + nodesSnapshot.snapshotItem(i).textContent );
		}

		return a;


	}

	);


	const text = await page.evaluate(() => {

		var nodesSnapshot = document.evaluate("//span[@class='sr-hotel__name\n']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


		var a = [];

		for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		{
			a.push( i + " " + nodesSnapshot.snapshotItem(i).textContent );
		}

		return a;
	});

//	console.log(text);
	await browser.close();
})();