const fs = require('fs');

function transform(file, next) {
	console.log('convert "%s" ~> "%s"', file, next);

	let code = fs.readFileSync(file, 'utf8');
	code = code.replace('export default', 'module.exports =');
	code = code.replace(/export const /g, 'exports.');
	code = code.replace('exports.$ =', 'const $ = exports.$ =');
	fs.writeFileSync(next, code, 'utf8');
}

transform('index.mjs', 'index.js');
transform('colors.mjs', 'colors.js');
