/**
 * 
 */

var testCase = [];
var results = [];

const input1 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"name" : "//*[@class='hp__hotel-name']",
		"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']",
		"rooms":{"room":"//*[@class='jqrt togglelink']"}}}];
var output1 = {"name":"\nHotel\nItaliana Hotels Cosenza\n","address":"\nVia Panebianco 452, 87100 Cosenza, Italia\n","rooms":{"room":"\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n"}};

const input2 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["./descendant-or-self::*[@class='jqrt togglelink']"]}}];
var output2 = {"allrooms":
"\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\nCamera Familiare\n2 letti singoli  e  1 letto matrimoniale\nJunior Suite\n1 divano letto  e 1 letto matrimoniale\nSuite\n2 letti singoli  e 1 letto matrimoniale\nCamera Matrimoniale Business"};

const input3 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["//*[@class='jqrt togglelink']"],
		"name" : "//*[@class='hp__hotel-name']",
		"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']"}}];
var output3 = {"allrooms":
	"\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\nCamera Familiare\n2 letti singoli  e  1 letto matrimoniale\nJunior Suite\n1 divano letto  e 1 letto matrimoniale\nSuite\n2 letti singoli  e 1 letto matrimoniale\nCamera Matrimoniale Business",
	"name":"\nHotel\nItaliana Hotels Cosenza\n",
	"address":"\nVia Panebianco 452, 87100 Cosenza, Italia\n"};

const input4 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["//*[@class='jqrt togglelink']"]}}];
var output4 = {"allrooms":
"\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\nCamera Familiare\n2 letti singoli  e  1 letto matrimoniale\nJunior Suite\n1 divano letto  e 1 letto matrimoniale\nSuite\n2 letti singoli  e 1 letto matrimoniale\nCamera Matrimoniale Business"};

function main() {
//	pushTestCase(input1);
//	pushResult(output1);
	pushTestCase(input2);
	pushResult(output2);
//	pushTestCase(input3);
//	pushResult(output3);

	var test =  [];
	var result = [];
	test = getTestCase();
	result = getResults();
	for(var i=0; i<test.length; i++) {
//		console.log(JSON.stringify(test[i]));
//		console.log("valoreAtteso ");
//		console.log(result[i]);
	}

	return test;
}

function pushTestCase(input) {
	testCase.push(input);
}
function pushResult(input) {
	results.push(input);
}
function getTestCase() {
	return testCase;
}
function getResults() {
	return results;
}
//main();

module.exports.main = main;
module.exports.getResults = getResults;