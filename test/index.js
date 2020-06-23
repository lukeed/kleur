process.stdout.isTTY = true;

import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { ANSI, CODES } from './utils';
import kleur from '../index.mjs';

test('kleur', () => {
	assert.type(kleur, 'object', 'exports an object');
	assert.ok(kleur.enabled, 'colors enabled by default');
});

test('codes', () => {
	let k, tmp, val;
	for (k in CODES) {
		tmp = CODES[k];
		val = kleur[k]('~foobar~');
		assert.type(kleur[k], 'function', `is a function`);
		assert.type(kleur[k]().bold, 'function', '~> and is chainable');
		assert.type(val, 'string', 'returns a string value');
		assert.is(val, ANSI(tmp[0]) + '~foobar~' + ANSI(tmp[1]), '~> matches expected');
	}
});

test('chains', () => {
	let val = '~foobar~';
	let { bold, underline, italic, bgRed, red, green, yellow } = CODES;
	assert.is(kleur.red().bold(val), ANSI(red[0]) + ANSI(bold[0]) + val + ANSI(red[1]) + ANSI(bold[1]));
	assert.is(kleur.bold().yellow().bgRed().italic(val), ANSI(bold[0]) + ANSI(yellow[0]) + ANSI(bgRed[0]) + ANSI(italic[0]) + val + ANSI(bold[1]) + ANSI(yellow[1]) + ANSI(bgRed[1]) + ANSI(italic[1]));
	assert.is(kleur.green().bold().underline(val), ANSI(green[0]) + ANSI(bold[0]) + ANSI(underline[0]) + val + ANSI(green[1]) + ANSI(bold[1]) + ANSI(underline[1]));
});

test('nested', () => {
	let { yellow, red, bold, cyan, dim } = CODES;
	assert.is(
		kleur.red(`foo ${kleur.yellow('bar')} baz`),
		ANSI(red[0]) + 'foo ' + ANSI(yellow[0]) + 'bar' + ANSI(yellow[1]) + ANSI(red[0]) + ' baz' + ANSI(red[1])
	);
	assert.is(
		kleur.bold(`foo ${kleur.red().dim('bar')} baz`),
		ANSI(bold[0]) + 'foo ' + ANSI(red[0]) + ANSI(dim[0]) + 'bar' + ANSI(red[1]) + ANSI(dim[1]) + ANSI(bold[0]) + ' baz' + ANSI(bold[1])
	);
	assert.is(
		kleur.yellow(`foo ${kleur.red().bold('red')} bar ${kleur.cyan('cyan')} baz`),
		ANSI(yellow[0]) + 'foo ' + ANSI(red[0]) + ANSI(bold[0]) + 'red' + ANSI(red[1]) + ANSI(yellow[0]) + ANSI(bold[1]) + ' bar ' + ANSI(cyan[0]) + 'cyan' + ANSI(cyan[1]) + ANSI(yellow[0]) + ' baz' + ANSI(yellow[1])
	);
});

test('integer', () => {
	let { red, blue, italic } = CODES;
	assert.is(kleur.blue(123), ANSI(blue[0]) + '123' + ANSI(blue[1]), '~> basic');
	assert.is(kleur.red().italic(0), ANSI(red[0]) + ANSI(italic[0]) + '0' + ANSI(red[1]) + ANSI(italic[1]), '~> chain w/ 0');
	assert.is(kleur.italic(`${kleur.red(123)} ${kleur.blue(0)}`), ANSI(italic[0]) + ANSI(red[0]) + '123' + ANSI(red[1]) + ' ' + ANSI(blue[0]) + '0' + ANSI(blue[1]) + ANSI(italic[1]), '~> chain w/ nested & 0');
	assert.is(kleur.blue(-1), ANSI(blue[0]) + '-1' + ANSI(blue[1]), '~> basic w/ negatives');
});

// test('multiline', () => {
// 	let { blue, bold, red, italic } = CODES;
// 	assert.is(c.blue('hello\nworld'), ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + '\n' + ANSI(blue[0]) + 'world' + ANSI(blue[1]), '~> basic');
// 	assert.is(c.blue.bold('hello\nworld'), ANSI(bold[0]) + ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(bold[1]), '~> simple chain');
// 	assert.is(c.italic.bold(`${c.red('hello')}\n${c.blue('world')}`), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'hello' + ANSI(red[1]) + ANSI(italic[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(italic[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(italic[1]) + ANSI(bold[1]), '~> chain w/ nested');
// });

test('partial require', () => {
	let { red, bold, italic } = CODES;
	let r = kleur.red;
	let b = kleur.bold;
	let i = kleur.italic;

	assert.is(r('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> red()');
	assert.is(b('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> bold()');
	assert.is(i('baz'), ANSI(italic[0]) + 'baz' + ANSI(italic[1]), '~> italic()');

	assert.is(r().bold().italic('foo'), ANSI(red[0]) + ANSI(bold[0]) + ANSI(italic[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]) + ANSI(italic[1]), '~> red().bold().italic()');
	assert.is(r().bold().italic('foo'), ANSI(red[0]) + ANSI(bold[0]) + ANSI(italic[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]) + ANSI(italic[1]), '~> red().bold().italic() – repeat');

	assert.is(b().italic().red('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bold().italic().red()');
	assert.is(b().italic().red('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bold().italic().red() – repeat');

	assert.is(i().red().bold('baz'), ANSI(italic[0]) + ANSI(red[0]) + ANSI(bold[0]) + 'baz' + ANSI(italic[1]) + ANSI(red[1]) + ANSI(bold[1]), '~> italic().red().bold()');
	assert.is(i().red().bold('baz'), ANSI(italic[0]) + ANSI(red[0]) + ANSI(bold[0]) + 'baz' + ANSI(italic[1]) + ANSI(red[1]) + ANSI(bold[1]), '~> italic().red().bold() – repeat');

	assert.is(r('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> red() – clean');
	assert.is(b('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> bold() – clean');
	assert.is(i('baz'), ANSI(italic[0]) + 'baz' + ANSI(italic[1]), '~> italic() – clean');

});

test('named chains', () => {
	let { red, bold, italic } = CODES;

	let foo = kleur.red().bold;
	let bar = kleur.bold().italic().red;

	assert.is(kleur.red('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> c.red() – clean');
	assert.is(kleur.bold('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> c.bold() – clean');

	assert.is(foo('foo'), ANSI(red[0]) + ANSI(bold[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]), '~> foo()');
	assert.is(foo('foo'), ANSI(red[0]) + ANSI(bold[0]) + 'foo' + ANSI(red[1]) + ANSI(bold[1]), '~> foo() – repeat');

	assert.is(bar('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bar()');
	assert.is(bar('bar'), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'bar' + ANSI(bold[1]) + ANSI(italic[1]) + ANSI(red[1]), '~> bar() – repeat');

	assert.is(kleur.red('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]), '~> c.red() – clean');
	assert.is(kleur.bold('bar'), ANSI(bold[0]) + 'bar' + ANSI(bold[1]), '~> c.bold() – clean');

});

test('disabled', () => {
	kleur.enabled = false;
	assert.is(kleur.red('foo'), 'foo', '~> raw text only');
	assert.is(kleur.red().italic().bold('foobar'), 'foobar', '~> chaining okay');
});

test.run();
