import tap from 'tap';
import CODES from './constants.mjs';
import { ANSI } from './ansi.mjs';
import c from '../index.mjs';

tap.test('nested', (t) => {
	let { yellow, red, bold, cyan, dim } = CODES;
	t.is(
		c.red(`foo ${c.yellow('bar')} baz`),
		ANSI(red[0]) + 'foo ' + ANSI(yellow[0]) + 'bar' + ANSI(yellow[1]) + ANSI(red[0]) + ' baz' + ANSI(red[1]),
	);
	t.is(
		c.bold(`foo ${c.red().dim('bar')} baz`),
		ANSI(bold[0]) +
			'foo ' +
			ANSI(red[0]) +
			ANSI(dim[0]) +
			'bar' +
			ANSI(red[1]) +
			ANSI(dim[1]) +
			ANSI(bold[0]) +
			' baz' +
			ANSI(bold[1]),
	);
	t.is(
		c.yellow(`foo ${c.red().bold('red')} bar ${c.cyan('cyan')} baz`),
		ANSI(yellow[0]) +
			'foo ' +
			ANSI(red[0]) +
			ANSI(bold[0]) +
			'red' +
			ANSI(red[1]) +
			ANSI(yellow[0]) +
			ANSI(bold[1]) +
			' bar ' +
			ANSI(cyan[0]) +
			'cyan' +
			ANSI(cyan[1]) +
			ANSI(yellow[0]) +
			' baz' +
			ANSI(yellow[1]),
	);
	t.end();
});
