/**
 * 
 */

async function extract(context,el) {
	return await context.$x(el);
}
module.exports.extract = extract;