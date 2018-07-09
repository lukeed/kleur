const { format } = require('util');
const CODES = require('./codes');

const $ = { enabled:true };
const RGX = /\x1b\[[0-9]+m/ig;
const toANSI = x => `\x1b[${x}m`;

function print() {
	let out = format.apply(null, arguments);
	if (!$.enabled || out.trim().length == 0) return out;

	let i=0, tmp, arr=this.keys, isMulti=!!~out.indexOf('\n');
	for (; i < arr.length; i++) {
		tmp = CODES[arr[i]]; // [x1, x2, rgx]
		if (out.indexOf(tmp[0]) !== 0 || out.slice(-tmp[1].length) !== tmp[1]) {
			out = tmp[0] + out.replace(tmp[2], tmp[0]) + tmp[1];
		}
		isMulti && (out = out.replace(/(\r?\n)/g, `${tmp[1]}$1${tmp[0]}`));
	}

	return out;
}

function wrap(keys) {
	let fn = (...args) => print.apply(fn, args);
	Object.setPrototypeOf(fn, $);
	fn.keys = keys;
	return fn;
}

for (let k in CODES) {
	CODES[k] = CODES[k].map(toANSI).concat(new RegExp(`\\x1b\\[${CODES[k][1]}m`, 'g'));
	Object.defineProperty($, k, {
		get() {
			return this.keys !== void 0 ? (this.keys.push(k),this) : wrap([k]);
		}
	});
}

$.clear = str => {
	return str && typeof str === 'string' ? str.replace(RGX, '') : str;
}

module.exports = $;
