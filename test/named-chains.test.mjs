import tap from 'tap';
import CODES from './constants.mjs';
import {ANSI} from './ansi.mjs';
import c from '../index.mjs';

tap.test('named chains', t => {
	let { red, bold, italic } = CODES;

	let foo = c.red().bold;
	let bar = c.bold().italic().red;

	t.is(c.red('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> c.red() – clean');
	t.is(c.bold('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> c.bold() – clean');

	t.is(foo('foo'), ANSI(red[0]) + ANSI(bold[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]), '~> foo()');
	t.is(foo('foo'), ANSI(red[0]) + ANSI(bold[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]), '~> foo() – repeat');

	t.is(bar('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bar()');
	t.is(bar('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bar() – repeat');

	t.is(c.red('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> c.red() – clean');
	t.is(c.bold('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> c.bold() – clean');

	t.end();
});
