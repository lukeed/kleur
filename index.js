const { format } = require('util');
const CODES = require('./codes');

const $ = { enabled:true };
const RGX = /\x1b\[[0-9]+m/ig;

function print() {
	let out = format.apply(null, arguments);
	if (!$.enabled || out.trim().length == 0) return out;

	let i=0, tmp, arr=this.keys, isMulti=!!~out.indexOf('\n');
	for (; i < arr.length; i++) {
		tmp = CODES[arr[i]]; // { x1, x2, rgx }
		out = tmp.beg + out.replace(tmp.rgx, tmp.beg) + tmp.end;
		isMulti && (out = out.replace(/(\r?\n)/g, `${tmp.end}$1${tmp.beg}`));
	}

	return out;
}

function wrap(keys) {
	let ctx = {};
	let fn = Object.setPrototypeOf(print.bind(ctx), $);
	ctx.keys = fn.keys = keys;
	return fn;
}

for (let k in CODES) {
	CODES[k] = {
		beg: `\x1b[${CODES[k][0]}m`,
		end: `\x1b[${CODES[k][1]}m`,
		rgx: new RegExp(`\\x1b\\[${CODES[k][1]}m`, 'g')
	};
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
