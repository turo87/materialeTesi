/**
 * 
 */

async function print(obj) {
	var keys = Object.keys(obj);
	for(var j in keys) {
		var key = keys[j];
		var value = obj[key];
		console.log(key + " : " + value.toString());
	}
}
module.exports.print = print;