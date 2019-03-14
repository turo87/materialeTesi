/**
 * 
 */

//--- variabili utili per il riconoscimento del tipo di oggetti e selettori (array, oggetto(JSON))
var arrayConstructor = [].constructor; 
var objectConstructor = {}.constructor;
//---

function isSelectorString(selector) {
//	console.log("is selectorString:");
//	console.log(selector);
	if (!isSelectorStringArray(selector)) {
//		console.log("YES");
		return true;
	}
//	console.log("NO");
	return false;
}

function isSelectorStringArray(selector) {
//	console.log("is Selector String Arrray:");
//	console.log(selector);
//	console.log(selector.length);
	if (selector.constructor === arrayConstructor && selector.length == 1 ) {
//		console.log("YES");
		return true;
	}
//	console.log("NO");
	return false;
}

function isObject(node) {
	if (node.constructor === objectConstructor) {
		return true;
	}
	return false;
}

function isArray(node) {
	if (node.constructor === arrayConstructor) {
		return true;
	}
	return false;
}

function isForeach(obj) {
	if(Object.keys(obj)[0]=="_forEach_" && Object.keys(obj)[1]=="_extract_") {
		return true;
	}
	return false;
}

module.exports.isSelectorString = isSelectorString;
module.exports.isSelectorStringArray = isSelectorStringArray;
module.exports.isObject = isObject;
module.exports.isArray = isArray;
module.exports.isForeach = isForeach;
