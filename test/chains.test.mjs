import tap from 'tap';
import CODES from './constants.mjs';
import { ANSI } from './ansi.mjs';
import c from '../index.mjs';

tap.test('chains', (t) => {
	let val = '~foobar~';
	let { bold, underline, italic, bgRed, red, green, yellow } = CODES;
	t.is(c.red().bold(val), ANSI(red[0]) + ANSI(bold[0]) + val + ANSI(red[1]) + ANSI(bold[1]));
	t.is(
		c.bold().yellow().bgRed().italic(val),
		ANSI(bold[0]) +
			ANSI(yellow[0]) +
			ANSI(bgRed[0]) +
			ANSI(italic[0]) +
			val +
			ANSI(bold[1]) +
			ANSI(yellow[1]) +
			ANSI(bgRed[1]) +
			ANSI(italic[1]),
	);
	t.is(
		c.green().bold().underline(val),
		ANSI(green[0]) + ANSI(bold[0]) + ANSI(underline[0]) + val + ANSI(green[1]) + ANSI(bold[1]) + ANSI(underline[1]),
	);
	t.end();
});
