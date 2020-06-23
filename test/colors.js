process.stdout.isTTY = true;

import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { ANSI, CODES } from './utils';
import * as kleur from '../colors.mjs';

test('kleur', () => {
	assert.type(kleur, 'object', 'exports an object');
	assert.type(kleur.$, 'object', 'exports a "$" object');
	assert.is(kleur.$.enabled, true, '~> colors enabled by default');
});

test('codes', () => {
	let k, tmp, val;
	for (k in CODES) {
		tmp = CODES[k];
		val = kleur[k]('~foobar~');
		assert.type(kleur[k], 'function', `is a function`);
		assert.is(kleur[k](), undefined, '~> returns immediately');
		assert.type(val, 'string', 'returns a string value');
		assert.is(val, ANSI(tmp[0]) + '~foobar~' + ANSI(tmp[1]), '~> matches expected');
	}
});

test('wrappings', () => {
	let { yellow, red, bold, cyan, bgRed, dim, italic, underline } = CODES;

	assert.is(
		kleur.red(kleur.bold('~foo~')), //~> kleur.red().bold(val)
		ANSI(red[0]) + ANSI(bold[0]) + '~foo~' + ANSI(bold[1]) + ANSI(red[1])
	);

	assert.is(
		kleur.bold(kleur.yellow(kleur.bgRed(kleur.italic('~foo~')))), //~> kleur.bold().yellow().bgRed().italic(val)
		ANSI(bold[0]) + ANSI(yellow[0]) + ANSI(bgRed[0]) + ANSI(italic[0]) + '~foo~' + ANSI(italic[1]) + ANSI(bgRed[1]) + ANSI(yellow[1]) + ANSI(bold[1])
	);

	assert.is(
		kleur.cyan(kleur.bold(kleur.underline('~foo~'))), //~> kleur.cyan().bold().underline('~foo~')
		ANSI(cyan[0]) + ANSI(bold[0]) + ANSI(underline[0]) + '~foo~' + ANSI(underline[1]) + ANSI(bold[1]) + ANSI(cyan[1])
	);

	assert.is(
		kleur.red(`foo ${kleur.yellow('bar')} baz`),
		ANSI(red[0]) + 'foo ' + ANSI(yellow[0]) + 'bar' + ANSI(yellow[1]) + ANSI(red[0]) + ' baz' + ANSI(red[1])
	);

	assert.is(
		kleur.bold(`foo ${kleur.red(kleur.dim('bar'))} baz`),
		ANSI(bold[0]) + 'foo ' + ANSI(red[0]) + ANSI(dim[0]) + 'bar' + ANSI(dim[1]) + ANSI(bold[0]) + ANSI(red[1]) + ' baz' + ANSI(bold[1])
	);

	assert.is(
		kleur.yellow(`foo ${kleur.red(kleur.bold('red'))} bar ${kleur.cyan('cyan')} baz`),
		ANSI(yellow[0]) + 'foo ' + ANSI(red[0]) + ANSI(bold[0]) + 'red' + ANSI(bold[1]) + ANSI(red[1]) + ANSI(yellow[0]) + ' bar ' + ANSI(cyan[0]) + 'cyan' + ANSI(cyan[1]) + ANSI(yellow[0]) + ' baz' + ANSI(yellow[1])
	);
});

test('integer', () => {
	let { red, blue, italic } = CODES;

	assert.is(
		kleur.blue(-1),
		ANSI(blue[0]) + '-1' + ANSI(blue[1]),
		'~> negative'
	);

	assert.is(
		kleur.blue(123),
		ANSI(blue[0]) + '123' + ANSI(blue[1]),
		'~> positive'
	);

	assert.is(
		kleur.blue(0),
		ANSI(blue[0]) + '0' + ANSI(blue[1]),
		'~> zero'
	);

	assert.is(
		kleur.red(kleur.italic(0)), //~> kleur.red().italic(0)
		ANSI(red[0]) + ANSI(italic[0]) + '0' + ANSI(italic[1]) + ANSI(red[1]),
		'~> zero (chain)'
	);

	assert.is(
		kleur.italic(`${kleur.red(123)} ${kleur.blue(0)}`),
		ANSI(italic[0]) + ANSI(red[0]) + '123' + ANSI(red[1]) + ' ' + ANSI(blue[0]) + '0' + ANSI(blue[1]) + ANSI(italic[1]),
		'~> positive (chain w/ nested)'
	);
});

test('nullish', () => {
	assert.is(kleur.red(), undefined);
	assert.is(kleur.red(null), null);
});

test('boolean', () => {
	let { red } = CODES;
	assert.is(kleur.red(false), ANSI(red[0]) + 'false' + ANSI(red[1]));
	assert.is(kleur.red(true), ANSI(red[0]) + 'true' + ANSI(red[1]));
});

// test('multiline', () => {
// 	let { blue, bold, red, italic } = CODES;
// 	assert.is(c.blue('hello\nworld'), ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + '\n' + ANSI(blue[0]) + 'world' + ANSI(blue[1]), '~> basic');
// 	assert.is(c.blue.bold('hello\nworld'), ANSI(bold[0]) + ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(bold[1]), '~> simple chain');
// 	assert.is(c.italic.bold(`${c.red('hello')}\n${c.blue('world')}`), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'hello' + ANSI(red[1]) + ANSI(italic[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(italic[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(italic[1]) + ANSI(bold[1]), '~> chain w/ nested');
// });

test('toggle support', () => {
	let { red } = CODES;

	kleur.$.enabled = false;
	assert.is(kleur.red('foo'), 'foo');

	kleur.$.enabled = true;
	assert.is(kleur.red('foo'), ANSI(red[0]) + 'foo' + ANSI(red[1]));
});

test.run();
