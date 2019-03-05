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
		"rooms":{"room":"./descendant-or-self::*[@class='jqrt togglelink']"}}}];
var output1 = {"name":"\nHotel\nItaliana Hotels Cosenza\n",
		"address":"\nVia Panebianco 452, 87100 Cosenza, Italia\n",
		"rooms":{"room":"\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n"}};

const input2 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["./descendant-or-self::*[@class='jqrt togglelink']"]}}];
var output2 = { "allrooms":
	[ "'\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n'",
		"'\n\nCamera Familiare\n'",
		"'\n\nJunior Suite\n'",
		"'\n\nSuite\n'",
		"'\n\nCamera Matrimoniale Business\n'" ]};
const input3 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["//*[@class='jqrt togglelink']"],
		"name" : "//*[@class='hp__hotel-name']",
		"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']"}}];
var output3 = { "allrooms":
	[ "'\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n'",
		"'\n\nCamera Familiare\n'",
		"'\n\nJunior Suite\n'",
		"'\n\nSuite\n'",
		"'\n\nCamera Matrimoniale Business\n'" ],
		"name":"\nHotel\nItaliana Hotels Cosenza\n",
		"address":"\nVia Panebianco 452, 87100 Cosenza, Italia\n"};

const input4 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"rooms": {
		"_forEach_" : "//table[@id='maxotel_rooms']/tbody/tr/td[2]/div/div",
		"_extract_": {"type" : "./a", "describe" : "./div"
		}}}}];
var output4 = {"rooms": [

	{"type" : "\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n",
		"describe" : "2 letti singoli  oppure 1 letto matrimoniale "},
		{"type" : "Camera Familiare\n",
			"describe" : "2 letti singoli  e  1 letto matrimoniale"
		},
		{"type" : "\nJunior Suite\n",
			"describe" : "1 divano letto  e 1 letto matrimoniale"
		},
		{"type" : "\nSuite\n",
			"describe" : "2 letti singoli  e 1 letto matrimoniale"
		},
		{"type" : "\nCamera Matrimoniale Business\n",
			"describe" : "1 letto matrimoniale"
		}]};


const input5 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["//*[@class='jqrt togglelink']"]}}];
var output5 = { "allrooms":
	[ "'\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n'",
		"'\n\nCamera Familiare\n'",
		"'\n\nJunior Suite\n'",
		"'\n\nSuite\n'",
		"'\n\nCamera Matrimoniale Business\n'" ]};

const input6 = [
	{"open": "https://www.booking.com/searchresults.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM&sid=2f11f0f3ad146f3a648faa7e038f74a0&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.it.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM%3Bsid%3D2f11f0f3ad146f3a648faa7e038f74a0%3Btmpl%3Dsearchresults%3Bclass_interval%3D1%3Bdest_id%3D-116404%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dindex%3Bsrc_elem%3Dsb%3Bsrpvid%3D4910a725d83b0347%3Bss%3DCosenza%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%26%3B&ss=Crotone%2C+Calabria%2C+Italia&is_ski_area=&ssne=Cosenza&ssne_untouched=Cosenza&city=-116404&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&from_sf=1&search_pageview_id=4910a725d83b0347&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0&ac_position=0&ac_langcode=it&ac_click_type=b&dest_id=-116612&dest_type=city&place_id_lat=39.079899&place_id_lon=17.128599&search_pageview_id=4910a725d83b0347&search_selected=true&ss_raw=Crotone"},
	{"scrape":
	{"allhotel": {
		"_forEach_" : "//*[@data-hotelid]",
		"_extract_": {"name" : "./div[@class='sr_item_content sr_item_content_slider_wrapper ']/div[@class='sr_property_block_main_row']/div[@class='sr_item_main_block']/h3/a/span",
			"review" : "./div[@class='sr_item_content sr_item_content_slider_wrapper ']/div[@class='sr_property_block_main_row']/div[@class='sr_item_review_block']/div/div[@class='\nsr-review-score\n']/a[@class='sr-review-score__link']/div/div[@class='bui-review-score__badge']"
		}}}}];
var output6 = { allhotel:
	[ { name: '\nHelios Hotel\n', review: ' 8,1 ' },
		{ name: '\nCorsonove\n', review: ' 9,0 ' },
		{ name: '\nCentral Apartments\n', review: ' 9,2 ' },
		{ name: ' \nAppartamento\n ', review: undefined },
		{ name: '\nB&B Pitagora\n', review: ' 8,8 ' },
		{ name: ' \nAppartamento\n ', review: ' 9,5 ' },
		{ name: ' \nVilla\n ', review: ' 9,6 ' },
		{ name: '\nAlma b&b\n', review: ' 8,8 ' },
		{ name: '\nB&B L\'ORIZZONTE\n', review: ' 8,9 ' },
		{ name: '\nB&B Elisa\n', review: ' 9,2 ' },
		{ name: '\nB&B Milu\'\n', review: ' 9,6 ' },
		{ name: '\nJulia B&B\n', review: ' 9,2 ' },
		{ name: '\nBed & Ship Archimediterraneo\n', review: ' 7,6 ' },
		{ name: '\nSanta Veneranda\n', review: ' 9,5 ' },
		{ name: '\nIl Diamante\n', review: ' 9,7 ' } ] };



const input7 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape": {
		"allrooms":["//*[@class='jqrt togglelink']"],
		"roomsForEach": {
			"_forEach_" : "//table[@id='maxotel_rooms']/tbody/tr/td[2]/div/div",
			"_extract_": {"type" : "./a", 
				"describe" : "./div"}
		},
		"name" : "//*[@class='hp__hotel-name']",
		"address" : "//*[@class='\nhp_address_subtitle\njs-hp_address_subtitle\njq_tooltip\n']",
		"rooms":{
			"room":"./descendant-or-self::*[@class='jqrt togglelink']"}}}];
var output7 = { "allrooms":
	[ "'\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n'",
		"'\n\nCamera Familiare\n'",
		"'\n\nJunior Suite\n'",
		"'\n\nSuite\n'",
		"'\n\nCamera Matrimoniale Business\n'" ],
		"roomsForEach": [
			{"type" : "\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n",
				"describe" : "2 letti singoli  oppure 1 letto matrimoniale "},
				{"type" : "Camera Familiare\n",
					"describe" : "2 letti singoli  e  1 letto matrimoniale"
				},
				{"type" : "\nJunior Suite\n",
					"describe" : "1 divano letto  e 1 letto matrimoniale"
				},
				{"type" : "\nSuite\n",
					"describe" : "2 letti singoli  e 1 letto matrimoniale"
				},
				{"type" : "\nCamera Matrimoniale Business\n",
					"describe" : "1 letto matrimoniale"
				}],
				"name":"\nHotel\nItaliana Hotels Cosenza\n",
				"address":"\nVia Panebianco 452, 87100 Cosenza, Italia\n",
				"rooms":{
					"room":"\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n"}};

const input8 = [
	{"open": "https://coinmarketcap.com/it/"},
	{"scrape": {
		"coins": {
			"_forEach_" : "//table[@id='currencies']/tbody/tr",
			"_extract_" : {
				"ranking" : "./td[1]",
				"name" : "./td[2]/a",
				"performance" : {
					"marketcap$" : "./td[3]/text()",
					"price" : "./td[4]",
					"last24h" : {
						"circulatingSupply" : "./td[5]",
						"change" : "./td[6]"
					}
				}
			}
		}
	}}];
const output8 = { "coins": {
	"ranking" : "",
	"name" : "",
	"performance" : {
		"marketcap" : "",
		"price" : "",
		"last24h" : ""
	}
}};

function main() {
//	pushTestCase(input1);	pushResult(output1);
//	pushTestCase(input2);	pushResult(output2);
//	pushTestCase(input3);	pushResult(output3);
	pushTestCase(input4);	pushResult(output4);
//	pushTestCase(input5);	pushResult(output5);
	pushTestCase(input6);	pushResult(output6);
	pushTestCase(input7);	pushResult(output7);
	pushTestCase(input8);	pushResult(output8);


	//	console.log(input7);
	//	console.log(output7);

//	console.log(input8);
//	console.log(output8);

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