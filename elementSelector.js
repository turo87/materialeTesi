/**
 * 
 */
var elementExtractor = require('./elementExtractor.js');

async function selection(obj,page) {
	var keys = Object.keys(obj);
	for(var j in keys) {
		var key = keys[j];
		var value = obj[key].toString();
		var feature = await elementExtractor.extract(page,value);
		obj[key] = feature;
	}
	return obj;
}
module.exports.selection = selection;