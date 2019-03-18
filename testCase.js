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
		"allrooms":["//*[@class='jqrt togglelink']"]}}];
var output1 = { "name":"\nHotel\nItaliana Hotels Cosenza\n",
		"address":"\nVia Panebianco 452, 87100 Cosenza, Italia\n",
		"allrooms":
			[ "'\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n'",
				"'\n\nCamera Familiare\n'",
				"'\n\nJunior Suite\n'",
				"'\n\nSuite\n'",
				"'\n\nCamera Matrimoniale Business\n'" ]};
const input2 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"rooms": {
		"_forEach_" : "//table[@id='maxotel_rooms']/tbody/tr/td[2]/div/div",
		"_extract_": {
			"type" : "./a", 
			"describe" : "./div"
		}}}}];
var output2 = {"rooms": [
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



const input3 = [
	{"open": "https://www.booking.com/searchresults.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM&sid=2f11f0f3ad146f3a648faa7e038f74a0&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.it.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM%3Bsid%3D2f11f0f3ad146f3a648faa7e038f74a0%3Btmpl%3Dsearchresults%3Bclass_interval%3D1%3Bdest_id%3D-116404%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dindex%3Bsrc_elem%3Dsb%3Bsrpvid%3D4910a725d83b0347%3Bss%3DCosenza%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%26%3B&ss=Crotone%2C+Calabria%2C+Italia&is_ski_area=&ssne=Cosenza&ssne_untouched=Cosenza&city=-116404&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&from_sf=1&search_pageview_id=4910a725d83b0347&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0&ac_position=0&ac_langcode=it&ac_click_type=b&dest_id=-116612&dest_type=city&place_id_lat=39.079899&place_id_lon=17.128599&search_pageview_id=4910a725d83b0347&search_selected=true&ss_raw=Crotone"},
	{"scrape":
	{"allhotel": {
		"_forEach_" : "//*[@data-hotelid]",
		"_extract_": {"name" : ".//span[@class='sr-hotel__name\n']",
			"review" : ".//*[@class='bui-review-score__badge']"
		}}}}];
var output3 = { allhotel:
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

const input4 = [
	{
		"open": "https://coinmarketcap.com/it/"
	},
	{
		"scrape": 
		{
			"coins": 
			{
				"_forEach_" : "//table[@id='currencies']/tbody/tr",
				"_extract_" : 
				{
					"ranking" : "./td[1]",
					"name" : "./td[2]/a",
					"performance" : 
					{
						"marketcap$" : "./td[3]/text()",
						"price" : "./td[4]",
						"last24h" : 
						{
							"circulatingSupply" : "./td[5]",
							"change" : "./td[6]"
						}
					}
				}
			}
		}
	}];
const output4 = { "coins": {
	"ranking" : "",
	"name" : "",
	"performance" : {
		"marketcap" : "",
		"price" : "",
		"last24h" : ""
	}
}};

const input5 = [
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
			"room":["//descendant-or-self::*[@class='jqrt togglelink']"]}}}];
var output5 = { "allrooms":
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

const input6 = [
	{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape": {
		"a" : { "name" : "//*[@class='hp__hotel-name']",
			"allrooms":["//*[@class='jqrt togglelink']"],
			"b" : { "name" : "//*[@class='hp__hotel-name']",
				"allrooms":["//*[@class='jqrt togglelink']"],
				"c" : { "name" : "//*[@class='hp__hotel-name']",
					"allrooms":["//*[@class='jqrt togglelink']"]
				}
			}
		}
	}}];
const output6 = {"a":{
	"name":"\nHotel\nItaliana Hotels Cosenza\n",
	"allrooms":
		["\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n",
			"\n\nCamera Familiare\n",
			"\n\nJunior Suite\n",
			"\n\nSuite\n",
			"\n\nCamera Matrimoniale Business\n"],
			"b":{
				"name":"\nHotel\nItaliana Hotels Cosenza\n",
				"allrooms":
					["\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n",
						"\n\nCamera Familiare\n",
						"\n\nJunior Suite\n",
						"\n\nSuite\n",
						"\n\nCamera Matrimoniale Business\n"],
						"c":{
							"name":"\nHotel\nItaliana Hotels Cosenza\n",
							"allrooms":
								["\n\nCamera Economy Matrimoniale/Doppia con Letti Singoli\n",
									"\n\nCamera Familiare\n",
									"\n\nJunior Suite\n"
									,"\n\nSuite\n",
									"\n\nCamera Matrimoniale Business\n"]}}}};


const input8 = [{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["./descendant-or-self::*[@class='jqrt togglelink']",
		"./descendant-or-self::*[@class='jqrt togglelink']"]}}];

const input9 = [{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":[["a.jqrt"],
		["./descendant-or-self::*[@class='jqrt togglelink']"]]}}];

const input10 = [{"open": "https://it-it.facebook.com/salviniofficial/"},
	{"scrape":
	{"allfriend":["./descendant-or-self::*[@class='_2pie _14i5 _1qkq _1qkx']"]}}];

const input11 = [{"open": "https://www.gazzetta.it/calcio/serie-a/classifica/"},
	{"scrape":
	{"allTeams":["./descendant-or-self::*[@class='sc-EHOje kqBPwW']"]}}];

const input12 = [{"open":"https://www.booking.com"}, 
	{"type":{"id":"//*[@id='ss']", "value":"Cosenza"}},
	{"click":".sb-searchbox__button"},
	{"waitUntilPresent":"#hotellist_inner"},
	{"scrape":{
		"_forEach_":"//*[@data-hotelid]",
		"_extract_":{
			"name":".//*[@class='sr-hotel__name\n'][1]"}}}];

const input13 = [
	{
		"open":"https://www.coinmarketcap.com"
	},
	{
		"waitUntilPresent" : "//table[@id='currencies']"
	},
	{
		"click" : "//a[text()='View All']"
	}];

const input14 = [{"open":"https://www.booking.com/searchresults.it.html?label=gen173nr-1DCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQzYAQPoAQGIAgGoAgO4AqPduuQFwAIB&sid=2f11f0f3ad146f3a648faa7e038f74a0&sb=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.it.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQzYAQPoAQGIAgGoAgO4AqPduuQFwAIB%3Bsid%3D2f11f0f3ad146f3a648faa7e038f74a0%3Bsb_price_type%3Dtotal%26%3B&ss=Cosenza&is_ski_area=0&ssne=Cosenza&ssne_untouched=Cosenza&dest_id=-116404&dest_type=city&checkin_year=&checkin_month=&checkout_year=&checkout_month=&no_rooms=1&group_adults=2&group_children=0&b_h4u_keep_filters=&from_sf=1"}, 
//	{"type":{"id":"#ss", "value":"Cosenza"}},
//	{"click":".sb-searchbox__button"},
//	{"waitUntilPresent":"#hotellist_inner"},
	{"scrape":{
		"_forEach_":"div.sr_item_default[data-hotelid]",
		"_extract_":{
			"name":"span.sr-hotel__name"}}}];



const input15 = [
	{
		"open": "https://coinmarketcap.com/it/"
	},
	{
		"scrape": 
		{
			"coins": 
			{
				"_forEach_" : "#currencies tbody tr",
				"_extract_" : 
				{
					"ranking" : "./td[1]",
					"name" : "./td[2]/a",
					"performance" : 
					{
						"marketcap$" : "./td[3]/text()",
						"price" : "./td[4]",
						"last24h" : 
						{
							"circulatingSupply" : "./td[5]",
							"change" : "./td[6]"
						}
					}
				}
			}
		}
	}];

const input16 = [{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["a.jqrt",
		"a.jqrt"]}}];

const input17 = [{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["a.jqrt"]}}];


function main() {
	pushTestCase(input1);	pushResult(output1);
	pushTestCase(input2);	pushResult(output2);
	pushTestCase(input3);	pushResult(output3);
	pushTestCase(input4);	pushResult(output4);
	pushTestCase(input5);	pushResult(output5);
	pushTestCase(input6);	pushResult(output6);

	pushTestCase(input8);	
	pushTestCase(input9);	
	pushTestCase(input10);	
	pushTestCase(input11);	
	pushTestCase(input12);	
	pushTestCase(input13);

	pushTestCase(input14);	
	pushTestCase(input15);	
	pushTestCase(input16);	
	pushTestCase(input17);	


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
main();

module.exports.main = main;
module.exports.getResults = getResults;
module.exports.getTestCase = getTestCase;