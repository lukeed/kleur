import tap from 'tap';
import CODES from './constants.mjs';
import {ANSI} from './ansi.mjs';
import c from '../index.mjs';

tap.test('integer', t => {
	let { red, blue, italic } = CODES;
	t.is(c.blue(123), ANSI(blue[0]) + '123' + ANSI(blue[1]), '~> basic');
	t.is(c.red().italic(0), ANSI(red[0]) + ANSI(italic[0]) + '0' + ANSI(red[1]) + ANSI(italic[1]), '~> chain w/ 0');
	t.is(c.italic(`${c.red(123)} ${c.blue(0)}`), ANSI(italic[0]) + ANSI(red[0]) + '123' + ANSI(red[1]) + ' ' + ANSI(blue[0]) + '0' + ANSI(blue[1]) + ANSI(italic[1]), '~> chain w/ nested & 0');
	t.is(c.blue(-1), ANSI(blue[0]) + '-1' + ANSI(blue[1]), '~> basic w/ negatives');
	t.end();
});
