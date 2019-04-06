var http = require('http');
var fs = require('fs');
var scrapl = require('./main');
var map = require('through2-map');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
var obj = {};
var c = "";
const server = http.createServer();

server.on('request', async (req, res) => {
	if(req.url === '/home' || req.url === '/') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.createReadStream(__dirname + "/index.jsp").pipe(res);
	}
	else if(req.method == "POST") {
		await req.pipe(map(function(chunk) {
			var a = decodeURIComponent(chunk.toString().trim());
			var b = a.substr(6,a.length);
			var d = b.split("+");
			for(var i=0; i<d.length; i++) {
				c += d[i].trim();
			}
			obj = scrapl.main(decodeURIComponent(chunk.toString().trim()));
			return decodeURIComponent(chunk.toString().trim());
		}));
		const data = await someAsyncFunc();
		await res.writeHead(200, {'Content-Type': 'text/html'});
		await res.write(JSON.stringify(data,undefined,2));
		await res.end();
	}
	else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		fs.createReadStream(__dirname + "/404.html").pipe(res);
	}
});
function someAsyncFunc() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(obj);
		}, 10000);
	});
}
server.listen(8080);
console.log("node server has started on 127.0.0.1:8080");
