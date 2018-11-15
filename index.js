const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;

function code(open, close) {
	return {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
}

const CODES = {
	// modifiers
	reset: code(0, 0),
	bold: code(1, 22),
	dim: code(2, 22),
	italic: code(3, 23),
	underline: code(4, 24),
	inverse: code(7, 27),
	hidden: code(8, 28),
	strikethrough: code(9, 29),

	// colors
	black: code(30, 39),
	red: code(31, 39),
	green: code(32, 39),
	yellow: code(33, 39),
	blue: code(34, 39),
	magenta: code(35, 39),
	cyan: code(36, 39),
	white: code(37, 39),
	gray: code(90, 39),

	// background colors
	bgBlack: code(40, 49),
	bgRed: code(41, 49),
	bgGreen: code(42, 49),
	bgYellow: code(43, 49),
	bgBlue: code(44, 49),
	bgMagenta: code(45, 49),
	bgCyan: code(46, 49),
	bgWhite: code(47, 49)
};

let $ = {
	enabled: !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0'
};

function link(key, txt) {
	let str = txt == null ? '' : txt+'';
	this.keys.includes(key) || this.keys.push(key);
	return $.enabled && str ? run(this.keys, str) : str || this;
}

function chain(key) {
	let k, ctx={ keys:[key] };
	for (k in CODES) {
		ctx[k] = link.bind(ctx, k);
	}
	return ctx;
}

function run(arr, str) {
	let i=0, tmp;
	for (; i < arr.length;) {
		tmp = CODES[ arr[i++] ];
		str = tmp.open + str.replace(tmp.rgx, tmp.open) + tmp.close;
	}
	return str;
}

for (let key in CODES) {
	$[key] = txt => {
		let str = txt == null ? '' : txt+'';
		return $.enabled && str ? run([key], str) : str || chain(key);
	};
}

module.exports = $;
