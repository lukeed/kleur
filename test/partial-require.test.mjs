import tap from 'tap';
import CODES from './constants.mjs';
import {ANSI} from './ansi.mjs';
import c from '../index.mjs';

tap.test('partial require', t => {
	let { red, bold, italic } = CODES;
	let r = c.red;
	let b = c.bold;
	let i = c.italic;

	t.is(r('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> red()');
	t.is(b('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> bold()');
	t.is(i('baz'), ANSI(italic[0]) + 'baz' + ANSI(italic[1]), '~> italic()');

	t.is(r().bold().italic('foo'), ANSI(red[0]) + ANSI(bold[0]) + ANSI(italic[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]) + ANSI(italic[1]), '~> red().bold().italic()');
	t.is(r().bold().italic('foo'), ANSI(red[0]) + ANSI(bold[0]) + ANSI(italic[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]) + ANSI(italic[1]), '~> red().bold().italic() – repeat');

	t.is(b().italic().red('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bold().italic().red()');
	t.is(b().italic().red('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bold().italic().red() – repeat');

	t.is(i().red().bold('baz'), ANSI(italic[0]) + ANSI(red[0]) + ANSI(bold[0]) + 'baz' + ANSI(italic[1]) + ANSI(red[1]) + ANSI(bold[1]), '~> italic().red().bold()');
	t.is(i().red().bold('baz'), ANSI(italic[0]) + ANSI(red[0]) + ANSI(bold[0]) + 'baz' + ANSI(italic[1]) + ANSI(red[1]) + ANSI(bold[1]), '~> italic().red().bold() – repeat');

	t.is(r('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> red() – clean');
	t.is(b('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> bold() – clean');
	t.is(i('baz'), ANSI(italic[0]) + 'baz' + ANSI(italic[1]), '~> italic() – clean');

	t.end();
});