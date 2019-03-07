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
			"room":"./descendant-or-self::*[@class='jqrt togglelink']"}}}];
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
const input7 = [
	{"open": "file:///Users/salvatore/Desktop/Capitalizzazioni%20di%20mercato%20di%20criptovaluta%20_%20CoinMarketCap.htm"},
	{"scrape":{
		"allNames":["//table[@id='currencies']/tbody/tr/td[2]"]
	}}];
const output7 = { allNames:
	[ '\n\nBTC\n\nBitcoin\n',
		'\n\nETH\n\nEthereum\n',
		'\n\nXRP\n\nXRP\n',
		'\n\nEOS\n\nEOS\n',
		'\n\nLTC\n\nLitecoin\n',
		'\n\nBCH\n\nBitcoin Cash\n',
		'\n\nUSDT\n\nTether\n',
		'\n\nBNB\n\nBinance Coin\n',
		'\n\nXLM\n\nStellar\n',
		'\n\nTRX\n\nTRON\n',
		'\n\nBSV\n\nBitcoin SV\n',
		'\n\nADA\n\nCardano\n',
		'\n\nXMR\n\nMonero\n',
		'\n\nMIOTA\n\nIOTA\n',
		'\n\nDASH\n\nDash\n',
		'\n\nMKR\n\nMaker\n',
		'\n\nNEO\n\nNEO\n',
		'\n\nETC\n\nEthereum Classic\n',
		'\n\nXEM\n\nNEM\n',
		'\n\n\nZEC\n\nZcash\n',
		'\n\nONT\n\nOntology\n',
		'\n\nWAVES\n\nWaves\n',
		'\n\nXTZ\n\nTezos\n',
		'\n\nVET\n\nVeChain\n',
		'\n\nUSDC\n\nUSD Coin\n',
		'\n\nDOGE\n\nDogecoin\n',
		'\n\nBAT\n\nBasic Attenti...\n',
		'\n\nBTG\n\nBitcoin Gold\n',
		'\n\nTUSD\n\nTrueUSD\n',
		'\n\nQTUM\n\nQtum\n',
		'\n\nOMG\n\nOmiseGO\n',
		'\n\nDCR\n\nDecred\n',
		'\n\nLINK\n\nChainlink\n',
		'\n\n\nHOT\n\nHolo\n',
		'\n\nLSK\n\nLisk\n',
		'\n\nZIL\n\nZilliqa\n',
		'\n\nREP\n\nAugur\n',
		'\n\nZRX\n\n0x\n',
		'\n\nABBC\n\nABBC Coin\n',
		'\n\nICX\n\nICON\n',
		'\n\nDGB\n\nDigiByte\n',
		'\n\nTHETA\n\nTHETA\n',
		'\n\nBCN\n\nBytecoin\n',
		'\n\nBTS\n\nBitShares\n',
		'\n\nSTEEM\n\nSteem\n',
		'\n\nNANO\n\nNano\n',
		'\n\nBCD\n\nBitcoin Diamond\n',
		'\n\nNPXS\n\nPundi X\n',
		'\n\nPAX\n\nPaxos Standar...\n',
		'\n\nAE\n\nAeternity\n',
		'\n\nKMD\n\nKomodo\n',
		'\n\nSC\n\nSiacoin\n',
		'\n\nXVG\n\nVerge\n',
		'\n\nIOST\n\nIOST\n',
		'\n\nDAI\n\nDai\n',
		'\n\nBTM\n\nBytom\n',
		'\n\nSTRAT\n\nStratis\n',
		'\n\nENJ\n\nEnjin Coin\n',
		'\n\nHT\n\nHuobi Token\n',
		'\n\nGUSD\n\nGemini Dollar\n',
		'\n\nRVN\n\nRavencoin\n',
		'\n\nSNT\n\nStatus\n',
		'\n\n PPT\n\nPopulous\n',
		'\n\nREPO\n\nREPO\n',
		'\n\nXIN\n\nMixin\n',
		'\n\nGNT\n\nGolem\n',
		'\n\nARK\n\nArk\n',
		'\n\nCNX\n\nCryptonex\n',
		'\n\nAOA\n\nAurora\n',
		'\n\nARDR\n\nArdor\n',
		'\n\n\nFCT\n\nFactom\n',
		'\n\nMAID\n\nMaidSafeCoin\n',
		'\n\nNEXO\n\nNexo\n',
		'\n\nR\n\nRevain\n',
		'\n\nETN\n\nElectroneum\n',
		'\n\nHC\n\nHyperCash\n',
		'\n\nMOAC\n\nMOAC\n',
		'\n\nLRC\n\nLoopring\n',
		'\n\nPAI\n\nProject Pai\n',
		'\n\nWTC\n\nWaltonchain\n',
		'\n\nMANA\n\nDecentraland\n',
		'\n\nPIVX\n\nPIVX\n',
		'\n\nCRO\n\nCrypto.com Chain\n',
		'\n\nKCS\n\nKuCoin Shares\n',
		'\n\nLOOM\n\nLoom Network\n',
		'\n\nQNT\n\nQuant\n',
		'\n\nINB\n\nInsight Chain\n',
		'\n\nMCO\n\nCrypto.com\n',
		'\n\nLKY\n\nLinkey\n',
		'\n\nODE\n\nODEM\n',
		'\n\nDGTX\n\nDigitex Futures\n',
		'\n\nELF\n\naelf\n',
		'\n\nQBIT\n\nQubitica\n',
		'\n\nQASH\n\nQASH\n',
		'\n\nGXC\n\nGXChain\n',
		'\n\nWAX\n\nWAX\n',
		'\n\nXZC\n\nZcoin\n',
		'\n\nETP\n\nMetaverse ETP\n',
		'\n\nPOWR\n\nPower Ledger\n',
		'\n\nRDD\n\nReddCoin\n' ] };


const input8 = [{"open": "https://www.booking.com/hotel/it/holiday-inn-cosenza.it.html?label=gen173nr-1FCAEoggI46AdIM1gEaHGIAQGYARS4AQfIAQ_YAQHoAQH4AQuIAgGoAgM;sid=9e5a2f72fb374b24b8be4033628b9dd1;dest_id=-116404;dest_type=city;dist=0;hapos=1;hpos=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1550836160;srpvid=c4ce532049eb0091;type=total;ucfs=1&#hotelTmpl"},
	{"scrape":
	{"allrooms":["./descendant-or-self::*[@class='jqrt togglelink']",
		"./descendant-or-self::*[@class='jqrt togglelink']"]}}];


function main() {
	pushTestCase(input1);	pushResult(output1);
	pushTestCase(input2);	pushResult(output2);
	pushTestCase(input3);	pushResult(output3);
	pushTestCase(input4);	pushResult(output4);
	pushTestCase(input5);	pushResult(output5);
	pushTestCase(input6);	pushResult(output6);
	pushTestCase(input7);	pushResult(output7);
	pushTestCase(input8);	

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