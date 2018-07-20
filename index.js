const $ = { enabled:true };

const CODES = {
  // modifiers
  reset: fmt([0, 0]),
  bold: fmt([1, 22]),
  dim: fmt([2, 22]),
  italic: fmt([3, 23]),
  underline: fmt([4, 24]),
  inverse: fmt([7, 27]),
  hidden: fmt([8, 28]),
  strikethrough: fmt([9, 29]),
  // colors
  black: fmt([30, 39]),
  red: fmt([31, 39]),
  green: fmt([32, 39]),
  yellow: fmt([33, 39]),
  blue: fmt([34, 39]),
  magenta: fmt([35, 39]),
  cyan: fmt([36, 39]),
  white: fmt([37, 39]),
  gray: fmt([90, 39]),
  // background colors
  bgBlack: fmt([40, 49]),
  bgRed: fmt([41, 49]),
  bgGreen: fmt([42, 49]),
  bgYellow: fmt([43, 49]),
  bgBlue: fmt([44, 49]),
  bgMagenta: fmt([45, 49]),
  bgCyan: fmt([46, 49]),
  bgWhite: fmt([47, 49])
};

function fmt(arr) {
	return {
		open: `\x1b[${arr[0]}m`,
		close: `\x1b[${arr[1]}m`,
		rgx: new RegExp(`\\x1b\\[${arr[1]}m`, 'g')
	}
}

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
	$[k] = attach(k);
}

module.exports = $;
