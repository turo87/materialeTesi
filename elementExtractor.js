/**
 * 
 */

async function extract(context,el) {
	var ex = await context.$x(el);
	var out = await context.evaluate(el => {
		return el.textContent;
	},ex[0]);
	return out;
}
module.exports.extract = extract;