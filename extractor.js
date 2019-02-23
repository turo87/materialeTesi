/**
 * 
 */

var deparse = require('./inputDeparser.js');
var browserOpener = require('./browserOpener.js');
var pageOpener = require('./pageOpener.js');
var selector = require('./selector.js');
var output = require('./outputExtractor.js');
var closer = require('./browserCloser');

const inputJson = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape": {
		"name" : "//*[@class='hp__hotel-name']",
		"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']"
	}}];

let url = deparse.url(inputJson);
let obj = deparse.scrape(inputJson);

(async () => {
	let openBrowser = await browserOpener.open();
	let openPage = await pageOpener.open(openBrowser,url);
	let elementSelection =  await selector.selection(obj,openPage);
	let elementExtraction =  output.print(elementSelection);
	let closeBrowser = await closer.close(openBrowser);
})();



