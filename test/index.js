'use strict';
const test = require('tape');
// Assign before kleur mutates entries
const CODES = Object.assign({}, require('../codes'));
const c = require('../');

test('kleur', t => {
	t.is(typeof c, 'object', 'exports an object');
	t.ok(c.enabled, 'colors enabled by default');
	t.end();
});

test('codes', t => {
	let k, tmp, val;
	for (k in CODES) {
		tmp = CODES[k];
		val = c[k]('~foobar~');
		t.comment(`:: kleur.${k} ::`)
		t.is(typeof c[k], 'function', `is a function`);
		t.is(typeof c[k].bold, 'function', '~> and is chainable');
		t.is(typeof val, 'string', 'returns a string value');
		t.is(val, `\x1b[${tmp[0]}m~foobar~\x1b[${tmp[1]}m`, '~> matches expected');
	}
	t.end();
});

test('chains', t => {
	let val = '~foobar~';
	t.is(c.red.bold(val), `\x1b[${CODES.bold[0]}m\x1b[${CODES.red[0]}m${val}\x1b[${CODES.red[1]}m\x1b[${CODES.bold[1]}m`);
	t.is(c.bold.yellow.bgRed.italic(val), `\x1b[${CODES.italic[0]}m\x1b[${CODES.bgRed[0]}m\x1b[${CODES.yellow[0]}m\x1b[${CODES.bold[0]}m${val}\x1b[${CODES.bold[1]}m\x1b[${CODES.yellow[1]}m\x1b[${CODES.bgRed[1]}m\x1b[${CODES.italic[1]}m`);
	t.is(c.green.bold.underline(val), `\x1b[${CODES.underline[0]}m\x1b[${CODES.bold[0]}m\x1b[${CODES.green[0]}m${val}\x1b[${CODES.green[1]}m\x1b[${CODES.bold[1]}m\x1b[${CODES.underline[1]}m`);
	t.end();
});

test('nested', t => {
	let expect = `\x1b[${CODES.yellow[0]}mfoo \x1b[${CODES.bold[0]}m\x1b[${CODES.red[0]}mred\x1b[${CODES.yellow[0]}m\x1b[${CODES.bold[1]}m bar \x1b[${CODES.cyan[0]}mcyan\x1b[${CODES.yellow[0]}m baz\x1b[${CODES.yellow[1]}m`;
	t.is(c.yellow(`foo ${c.red.bold('red')} bar ${c.cyan('cyan')} baz`), expect);
	t.is(c.yellow('foo', c.red.bold('red'), 'bar', c.cyan('cyan'), 'baz'), expect);
	t.end();
});

test('printf', t => {
	let aaa = c.red.bold('%s:%s', 'foo', 'bar', 'baz');
	t.is(aaa, `\x1b[${CODES.bold[0]}m\x1b[${CODES.red[0]}mfoo:bar baz\x1b[${CODES.red[1]}m\x1b[${CODES.bold[1]}m`);
	let bbb = c.bold('%s:%s:%s', 'foo', c.red('bar'), 'baz');
	t.is(bbb, `\x1b[${CODES.bold[0]}mfoo:\x1b[${CODES.red[0]}mbar\x1b[${CODES.red[1]}m:baz\x1b[${CODES.bold[1]}m`);
	t.end();
});

test('clear', t => {
	t.is(typeof c.clear, 'function', 'kleur.clear is a function');
	t.is(c.clear(c.blue.bold('foo bar baz')), 'foo bar baz', '~> strips all codes');
	t.end();
});

test('disabled', t => {
	c.enabled = false;
	t.is(c.red.bold('foobar'), 'foobar', '~> equiv of clear()');
	t.end();
});
