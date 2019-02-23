/**
 * 
 */

exports.url = function(input){
	for(var i=0; i<input.length; i++){
		if(Object.keys(input[i])=="open"){
			return input[i].open;
		}
	}
};

exports.scrape = function(input){
	for(var i=0; i<input.length; i++){
		if(Object.keys(input[i])=="scrape"){
			return input[i].scrape;
		}
	}
};