/**
 * 
 */
var elementExtractor = require('./elementExtractor');
var informationExtractor = require('./informationExtractor');

async function selection(obj,page) {
	var keys = Object.keys(obj);
	for(var j in keys) {
		var key = keys[j];
		var value = obj[key];
		var feature = await elementExtractor.extract(page,value.toString());
		var res = await informationExtractor.extract(page,feature[0]);
		obj[key] = res;
	}
	return obj;
}
module.exports.selection = selection;