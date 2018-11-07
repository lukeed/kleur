const CODES = {
	// modifiers
	reset: [0, 0],
	bold: [1, 22],
	dim: [2, 22],
	italic: [3, 23],
	underline: [4, 24],
	inverse: [7, 27],
	hidden: [8, 28],
	strikethrough: [9, 29],

	// colors
	black: [30, 39],
	red: [31, 39],
	green: [32, 39],
	yellow: [33, 39],
	blue: [34, 39],
	magenta: [35, 39],
	cyan: [36, 39],
	white: [37, 39],
	gray: [90, 39],

	// background colors
	bgBlack: [40, 49],
	bgRed: [41, 49],
	bgGreen: [42, 49],
	bgYellow: [43, 49],
	bgBlue: [44, 49],
	bgMagenta: [45, 49],
	bgCyan: [46, 49],
	bgWhite: [47, 49]
};

let $ = { enabled:true };

function run(ctx, str) {
	let tmp;
	let arr = ctx.keys;
	while (arr.length > 0) {
		tmp = CODES[ arr.shift() ];
		str = tmp.open + str.replace(tmp.rgx, tmp.open) + tmp.close;
	}
	return str;
}

function input(key, txt) {
	if (this.keys === void 0) {
		this.keys = [key];
		for (let k in $) {
			if (k !== 'enabled') {
				this[k] = input.bind(this, k);
			}
		}
	} else {
		this.keys.push(key);
	}
	let str = txt == null ? '' : txt+'';
	return str && $.enabled ? run(this, str) : str || this;
}

for (let key in CODES) {
	CODES[key] = {
		open: `\x1b[${CODES[key][0]}m`,
		close: `\x1b[${CODES[key][1]}m`,
		rgx: new RegExp(`\\x1b\\[${CODES[key][1]}m`, 'g')
	};

	$[key] = input.bind({}, key);
}

module.exports = $;
