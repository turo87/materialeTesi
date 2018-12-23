const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.it/s/ref=nb_sb_noss?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords=iphone');

    // await page.$x() returns array of ElementHandle
    const featureArticles = (await page.$x('//h2'));
    
    console.log("ciao");

    for(var i=0; i<featureArticles.length; i++) {

        const text = await page.evaluate(el => {
            // do what you want with featureArticles in page.evaluate
            return el.textContent;
        }, featureArticles[i]);

        console.log(text);
    }

    await browser.close();
})();