/**
 * 
 */

var deparse = require('./inputDeparser.js');
var selector = require('./selector.js');
var output = require('./output.js');
var opener = require('./urlOpener.js');
var goto = require('./goto.js');
var closer = require('./closer');

const inputJson = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape": {
		"name" : "//*[@class='hp__hotel-name']",
		"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']"
	}}];

let url = deparse.url(inputJson);
let obj = deparse.scrape(inputJson);

(async () => {


	let page = await opener.open();
	let go = goto.go(page,url);

	let s =  await selector.selection(obj, page);
	let o =  output.print(s);


	let c = closer.close(page);
})();



