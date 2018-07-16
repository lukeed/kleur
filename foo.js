const CODES = require('./codes');
let $ = { enabled:true };

function exec(str) {
	if (!$.enabled) return str;
	let tmp, arr=this.keys;
	while (arr.length) {
		tmp = CODES[arr.shift()];
		str = tmp.open + str.replace(tmp.rgx, tmp.open) + tmp.close;
	}
	return str;
}

function attach(keys) {
	let ctx = { keys };
	let fn = exec.bind(ctx);
	for (let k in CODES) {
		Reflect.defineProperty(fn, k, {
			get() {
				ctx.keys.push(k);
				return fn;
			}
		});
	}
	return fn;
}

for (let k in CODES) {
	$[k] = attach([k]);
	CODES[k] = {
		open: `\x1b[${CODES[k][0]}m`,
		close: `\x1b[${CODES[k][1]}m`,
		rgx: new RegExp(`\\x1b\\[${CODES[k][1]}m`, 'g')
	}
}

module.exports = $;
