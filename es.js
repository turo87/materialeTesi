const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:///Users/salvatore/Desktop/Amazon.it%20%20iphone.html');

    // await page.$x() returns array of ElementHandle
    const featureArticles = (await page.$x("//li[@class='s-result-item celwidget  ']"));
    
    
    for(var i=0; i<featureArticles.length; i++) {

        const text = await page.evaluate(el => {
            // do what you want with featureArticles in page.evaluate
        	
            return el.textContent;
        }, featureArticles[i]);

        console.log(text);
    }

    await browser.close();
})();