const CODES = require('./codes');
let $ = { enabled:true };

function run(key, str) {
	let tmp = CODES[key];
	return tmp.open + str.replace(tmp.rgx, tmp.open) + tmp.close;
}

function exec(str) {
	if (!$.enabled) return str;
	let arr=this.keys, old=arr[0];
	while (arr.length > 0) {
		str = run(arr.shift(), str);
	}
	this.keys = [old];
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
