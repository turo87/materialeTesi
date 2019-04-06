
<!DOCTYPE html>
<html>
<script src="jquery-3.3.1.min.js" type="text/javascript"></script>
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<head>
<style type="text/css">
.immagine1 {
	position: absolute;
	left: 100px;
	top: 200px;
}

.immagine2 {
	position: absolute;
	left: 250px;
	top: 200px;
}

.immagine3 {
	position: absolute;
	left: 400px;
	top: 200px;
}

.immagine4 {
	position: absolute;
	left: 80px;
	top: 80px;
}

.immagine5 {
	position: absolute;
	left: 550px;
	top: 200px;
}

.immagine6 {
	position: absolute;
	left: 700px;
	top: 200px;
}

.immagine7 {
	position: absolute;
	left: 900px;
	top: 200px;
}

.immagine8 {
	position: absolute;
	left: 1050px;
	top: 200px;
}

.button {
	position: absolute;
	left: 200px;
	top: 700px;
	color: black;
}

.original {
	position: absolute;
	left: 150px;
	top: 300px;
	width: 70%;
	margin: 0 auto;
	padding: 1em;
	background: #fff;
	height: 350px;
	margin: 2px;
	border: 1px solid black;
	color: #fff;
	overflow: auto;
}

#dummy {
	color: black;
}

#board {
	z-index: 11;
	background: transparent;
	color: transparent;
	caret-color: black;
}

.original span.highlighted {
	color: #7d1d57;
}

.original2 {
	position: absolute;
	left: 150px;
	top: 750px;
	width: 70%;
	margin: 0 auto;
	padding: 1em;
	background: #fff;
	height: 350px;
	margin: 2px;
	border: 1px solid black;
	color: #fff;
	overflow: auto;
}

#dummy2 {
	color: black;
}

#board2 {
	z-index: 11;
	background: transparent;
	color: black;
	caret-color: black;
}

strong {
	font-weight: bold;
}

body {
	background: skyblue;
	font-family: verdana;
	color: #fff;
	padding: 30px;
}

h1 {
	font-size: 42px;
	text-transform: uppercase;
	letter-spacing: 2px;
	text-align: center;
}

p {
	font-size: 16px;
	text-align: center;
}
</style>
<title></title>
</head>
<body onload="fff()">

	<h1>Welcome to Scrapl</h1>
	<p>You won't find a scraper better anywhere else</p>
	<div>
		<img class="immagine1"
			src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/square_256/nodejslogo.png"
			width="80" height="80"> <img class="immagine2"
			src="https://www.marcogermani.it/wp-content/uploads/2016/05/css.png"
			width="80" height="80"> <img class="immagine6"
			src="https://dashboard.snapcraft.io/site_media/appmedia/2018/05/chromium-browser.png"
			width="80" height="80"> <img class="immagine7"
			src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/213/square_256/puppeteer.png"
			width="80" height="80"> <img class="immagine3"
			src="https://cdn.iconscout.com/icon/free/png-256/json-1-226019.png"
			width="100" height="100"><img class="immagine5"
			src="https://www.ssa-data.com/media/58920/xpath-res.png" width="120"
			height="80"> <img class="immagine8"
			src="https://ourcodeworld.com/public-media/gallery/categorielogo-5713d24f9fa5f.png"
			width="80" height="80"> <img class="immagine4"
			src="http://www.vai-project.eu/wp-content/uploads/2018/04/logo_cal.png"
			alt="Immagine correlata" width="200" height="70">

	</div>

	<form name="form" action="" method="POST"
		onsubmit="javascript:return false;">
		<br> <br> <br> <br> <br> <br>
		<div>
			{"ranking":"\n1\n","name":"Bitcoin","performance":{"marketcap$":"$88,705,725,525","price":"\n$5,031.26\n","last24h":{"circulatingSupply":"\n$15,533,564,320\n","change":"\n\n17,630,912\nBTC\n\n"}}},{"ranking":"\n2\n","name":"Ethereum","performance":{"marketcap$":"$17,414,226,868","price":"\n$164.99\n","last24h":{"circulatingSupply":"\n$6,752,482,876\n","change":"\n\n105,546,160\nETH\n\n"}}},{"ranking":"\n3\n","name":"XRP","performance":{"marketcap$":"$14,862,261,885","price":"\n$0.356035\n","last24h":{"circulatingSupply":"\n$1,328,180,692\n","change":"\n\n41,743,765,071\nXRP\n\n\n*\n"}}},{"ranking":"\n4\n","name":"Litecoin","performance":{"marketcap$":"$5,420,538,907","price":"\n$88.54\n","last24h":{"circulatingSupply":"\n$3,009,885,782\n","change":"\n
			\n61,220,411\nLTC\n\n"}}},{"ranking":"\n5\n","name":"Bitcoin
			Cash","performance":{"marketcap$":"$5,134,788,478","price":"\n$289.88\n","last24h":{"circulatingSupply":"\n$1,432,995,847\n","change":"\n\n17,713,663\nBCH\n\n"}}},{"ranking":"\n6\n","name":"EOS","performance":{"marketcap$":"$4,816,076,655","price":"\n$5.31\n","last24h":{"circulatingSupply":"\n$2,169,981,954\n","change":"\n\n906,245,118\nEOS\n\n*\n"}}},{"ranking":"\n7\n","name":"Binance
			Coin","performance":{"marketcap$":"$2,728,107,772","price":"\n$19.32\n","last24h":{"circulatingSupply":"\n$188,468,086\n","change":"\n\n141,175,490\nBNB\n\n*\n"}}},{"ranking":"\n8\n","name":"Stellar","performance":{"marketcap$":"$2,428,780,696","price":"\n$0.126042\n","last24h":{"circulatingSupply":"\n$313,013,319\n","change":"\n\n19,269,666,026\nXLM\n\n*\n"}}},{"ranking":"\n9\n","name":"Cardano","performance":{"marketcap$":"$2,308,342,184","price":"\n$0.089032\n","last24h":{"circulatingSupply":"\n$102,256,106\n","change":"\n\n25,927,070,538\nADA\n\n"}}},{"ranking":"\n10\n","name":"Tether","performance":{"marketcap$":"$2,088,365,460","price":"\n$1.01\n","last24h":{"circulatingSupply":"\n$13,594,167,247\n","change":"\n\n2,077,326,324\nUSDT\n\n*\n"}}},
			{"ranking":"\n11\n","name":"TRON","performance":{"marketcap$":"$1,792,487,336","price":"\n$0.026881\n","last24h":<br>
			<br> <br> <br> <br> <br>
			{"circulatingSupply":"\n$372,233,256\n","change":"\n\n66,682,072,191\nTRX\n\n"}}},{"ranking":"\n12\n","name":"Bitcoin
			SV","performance":{"marketcap$":"$1,474,876,590","price":"\n$83.47\n","last24h":{"circulatingSupply":"\n$134,271,502\n","change":"\n\n17,670,348\nBSV\n\n"}}},{"ranking":"\n13\n","name":"Monero","performance":{"marketcap$":"$1,154,586,383","price":"\n$68.31\n","last24h":{"circulatingSupply":"\n$93,011,450\n","change":"\n\n16,901,540\nXMR\n\n"}}},{"ranking":"\n14\n","name":"Dash","performance":{"marketcap$":"$1,152,679,476","price":"\n$131.94\n","last24h":{"circulatingSupply":"\n$304,462,714\n","change":"\n\n8,736,222\nDASH\n\n"}}},{"ranking":"\n15\n","name":"IOTA","performance":{"marketcap$":"$971,054,462","price":"\n$0.349359\n","last24h":{"circulatingSupply":"\n$15,674,693\n","change":"\n\n2,779,530,283\nMIOTA\n
			\n*\n"}}},{"ranking":"\n16\n","name":"NEO","performance":{"marketcap$":"$862,647,788","price":"\n$13.27\n","last24h":{"circulatingSupply":"\n$285,018,731\n","change":"\n\n65,000,000\nNEO\n\n*\n"}}},{"ranking":"\n17\n","name":"Ontology","performance":{"marketcap$":"$784,440,861","price":"\n$1.59\n","last24h":{"circulatingSupply":"\n$78,527,441\n","change":"\n\n494,823,234\nONT\n\n*\n"}}},{"ranking":"\n18\n","name":"Maker","performance":{"marketcap$":"$772,006,616","price":"\n$772.01\n","last24h":{"circulatingSupply":"\n$779,648\n","change":"\n\n1,000,000\nMKR\n\n*\n"}}},{"ranking":"\n19\n","name":"Tezos","performance":{"marketcap$":"$666,490,246","price":"\n$1.00\n","last24h":{"circulatingSupply":"\n$7,579,436\n","change":"\n\n664,046,164\nXTZ\n\n*\n"}}},{"ranking":"\n
			20\n","name":"NEM","performance":{"marketcap$":"$628,272,160","price":"\n$0.069808\n","last24h":{"circulatingSupply":"\n$25,574,198\n","change":"\n\n8,999,999,999\nXEM\n\n*\n"}}},{"ranking":"\n21\n","name":"Ethereum
			Classic","performance":{"marketcap$":"$620,177,194","price":"\n$5.66\n","last24h":{"circulatingSupply":"\n
			$335,437,687\n","change":"\n\n109,518,092\nETC\n\n"}}},{"ranking":"\n22\n","name":"Zcash","performance":{"
			<br> <br> <br> <br> <br>

			marketcap$":"$441,369,138","price":"\n$70.53\n","last24h":{"circulatingSupply":"\n$244,650,630\n","change":"\n\n6,257,869\nZEC\n\n"}}},{"ranking":"\n23\n","name":"VeChain","performance":{"marketcap$":"$421,882,183","price":"\n$0.007608\n","last24h":{"circulatingSupply":"\n$11,508,191\n","change":"\n\n55,454,734,800\nVET\n\n*\n"}}},{"ranking":"\n24\n","name":"Dogecoin","performance":{"marketcap$":"$412,368,343","price":"\n$0.003466\n","last24h":{"circulatingSupply":"\n$49,180,110\n","change":"\n\n118,961,051,287\nDOGE\n\n"}}},{"ranking":"\n25\n","name":"Basic
			Coin","performance":{"marketcap$":"$157,903,055","price":"\n$0.095757\n","last24h":{"circulatingSupply":"\n$18,488,192\n","change":"\n\n1,649,000,000\nMXM\n\n*\n"}}},{"ranking":"\n50\n","name":"Steem","performance":{"marketcap$":"$156,912,633","price":"\n$0.509965\n","last24h":{"circulatingSupply":"\n
			"}}}
		</div>
		<pre id="board" class="original" contenteditable="true" onkeyup="f()"></pre>
		<pre id="dummy" class="original">Editor</pre>
		<input id="input" type="hidden" value="" name="input"><br>
		<button type='submit' class='button' id='run'>RUN</button>
	</form>
	<div id="board2" class="original2" contenteditable="true"></div>
	<div id="dummy2" class="original2"></div>

</body>

<script>
	$("button").click(function() {
		var a = $("#dummy").text();
		var obj = JSON.parse(a);
		$.ajax({
			type : "POST",
			url : "./index.jsp",
			async : false,
			datatype : "json",
			data : {
				scrape : JSON.stringify(obj, undefined, 2)
			},
			success : function(data) {
				var accesso = $('<pre></pre>');
				accesso.html(data);
				$('#board2').append(accesso);
			}
		});
	});
</script>

<script charset="utf-8">
	function fff() {
		var c = $("#dummy").text();
		document.form.input.value = decodeURIComponent(c);
		setTimeout("fff()", 100);
	}
</script>
<script>
	function f() {
		var highLightedWord = [ "scrape", "open", "_extract_", "_forEach_",
				"type", "click", "waitUntilPresent" ];
		var regexFromMyArray = new RegExp(highLightedWord.join("|"), 'ig');
		$('#board').keyup(
				function(event) {
					document.getElementById('dummy').innerHTML = $('#board')
							.html().replace(
									regexFromMyArray,
									function(str) {
										return '<span class="highlighted">'
												+ str + '</span>'
									})
				})
		var target = $("#dummy");
		$("#board").scroll(
				function() {
					target.prop("scrollTop", this.scrollTop).prop("scrollLeft",
							this.scrollLeft);
				});
	}
</script>
</html>