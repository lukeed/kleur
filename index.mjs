'use strict';

let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
	isTTY = process.stdout && process.stdout.isTTY;
}

const $ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	),

	// modifiers
	reset: init(0, 0),
	bold: init(1, 22),
	dim: init(2, 22),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),

	// colors
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	grey: init(90, 39),
	brightBlack: init(90, 39),
	brightRed: init(91, 39),
	brightGreen: init(92, 39),
	brightYellow: init(93, 39),
	brightBlue: init(94, 39),
	brightMagenta: init(95, 39),
	brightCyan: init(96, 39),
	brightWhite: init(97, 39),

	// background colors
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49),
	bgBrightBlack: init(100, 49),
	bgBrightRed: init(101, 49),
	bgBrightGreen: init(102, 49),
	bgBrightYellow: init(103, 49),
	bgBrightBlue: init(104, 49),
	bgBrightMagenta: init(105, 49),
	bgBrightCyan: init(106, 49),
	bgBrightWhite: init(107, 49)
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (!!~str.indexOf(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);
	ctx.brightBlack = $.brightBlack.bind(ctx);
	ctx.brightRed = $.brightRed.bind(ctx);
	ctx.brightGreen = $.brightGreen.bind(ctx);
	ctx.brightYellow = $.brightYellow.bind(ctx);
	ctx.brightBlue = $.brightBlue.bind(ctx);
	ctx.brightMagenta = $.brightMagenta.bind(ctx);
	ctx.brightCyan = $.brightCyan.bind(ctx);
	ctx.brightWhite = $.brightWhite.bind(ctx);

	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);
	ctx.bgBrightBlack = $.bgBrightBlack.bind(ctx);
	ctx.bgBrightRed = $.bgBrightRed.bind(ctx);
	ctx.bgBrightGreen = $.bgBrightGreen.bind(ctx);
	ctx.bgBrightYellow = $.bgBrightYellow.bind(ctx);
	ctx.bgBrightBlue = $.bgBrightBlue.bind(ctx);
	ctx.bgBrightMagenta = $.bgBrightMagenta.bind(ctx);
	ctx.bgBrightCyan = $.bgBrightCyan.bind(ctx);
	ctx.bgBrightWhite = $.bgBrightWhite.bind(ctx);

	return ctx;
}

function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			!!~this.has.indexOf(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

export default $;
