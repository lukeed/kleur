let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
	isTTY = process.stdout && process.stdout.isTTY;
}

export const $ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	)
}

function init(x, y) {
	let rgx = new RegExp(`\\x1b\\[${y}m`, 'g');
	let open = `\x1b[${x}m`, close = `\x1b[${y}m`;

	return function (txt) {
		if (!$.enabled || txt == null) return txt;
		return open + (!!~(''+txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
	};
}

// modifiers
export const reset = init(0, 0);
export const bold = init(1, 22);
export const dim = init(2, 22);
export const italic = init(3, 23);
export const underline = init(4, 24);
export const inverse = init(7, 27);
export const hidden = init(8, 28);
export const strikethrough = init(9, 29);

// colors
export const black = init(30, 39);
export const red = init(31, 39);
export const green = init(32, 39);
export const yellow = init(33, 39);
export const blue = init(34, 39);
export const magenta = init(35, 39);
export const cyan = init(36, 39);
export const white = init(37, 39);
export const gray = init(90, 39);
export const grey = init(90, 39);
export const brightBlack = init(90, 39);
export const brightRed = init(91, 39);
export const brightGreen = init(92, 39);
export const brightYellow = init(93, 39);
export const brightBlue = init(94, 39);
export const brightMagenta = init(95, 39);
export const brightCyan = init(96, 39);
export const brightWhite = init(97, 39);

// background colors
export const bgBlack = init(40, 49);
export const bgRed = init(41, 49);
export const bgGreen = init(42, 49);
export const bgYellow = init(43, 49);
export const bgBlue = init(44, 49);
export const bgMagenta = init(45, 49);
export const bgCyan = init(46, 49);
export const bgWhite = init(47, 49);
export const bgBrightBlack = init(100, 49);
export const bgBrightRed = init(101, 49);
export const bgBrightGreen = init(102, 49);
export const bgBrightYellow = init(103, 49);
export const bgBrightBlue = init(104, 49);
export const bgBrightMagenta = init(105, 49);
export const bgBrightCyan = init(106, 49);
export const bgBrightWhite = init(107, 49);
