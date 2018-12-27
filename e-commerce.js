const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('file:///Users/salvatore/Desktop/Amazon.it%20%20iphone.html');


	// await page.$x() returns array of ElementHandle
	const articles = (await page.$x("//li[@class='s-result-item celwidget  ']"));

	for(var i=0; i<articles.length; i++) {

		const featureArticleTitle = (await page.$x("//li[@class='s-result-item celwidget  ']//h2"))[i];
		const title = await page.evaluate(el => {
			// do what you want with featureArticleTitle in page.evaluate
			return el.textContent;
		}, featureArticleTitle);

		console.log(title);


		const featureArticlePrice = (await page.$x("//span[@class='a-size-base a-color-price s-price a-text-bold']"))[i];
		const price = await page.evaluate(el => {
			// do what you want with featureArticlePrice in page.evaluate
			return el.textContent;
		}, featureArticlePrice);

		console.log(price);

		
	}

	await browser.close();
})();