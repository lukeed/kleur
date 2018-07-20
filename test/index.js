const test = require('tape');
// Assign before kleur mutates entries
const CODES = Object.assign({}, require('../codes'));
const c = require('..');

const ANSI = x => `\x1b[${x}m`;

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
		t.is(val, ANSI(tmp[0]) + '~foobar~' + ANSI(tmp[1]), '~> matches expected');
	}
	t.end();
});

test('chains', t => {
	let val = '~foobar~';
	let { bold, underline, italic, bgRed, red, green, yellow } = CODES;
	t.is(c.red.bold(val), ANSI(bold[0]) + ANSI(red[0]) + val + ANSI(red[1]) + ANSI(bold[1]));
	t.is(c.bold.yellow.bgRed.italic(val), ANSI(italic[0]) + ANSI(bgRed[0]) + ANSI(yellow[0]) + ANSI(bold[0]) + val + ANSI(bold[1]) + ANSI(yellow[1]) + ANSI(bgRed[1]) + ANSI(italic[1]));
	t.is(c.green.bold.underline(val), ANSI(underline[0]) + ANSI(bold[0]) + ANSI(green[0]) + val + ANSI(green[1]) + ANSI(bold[1]) + ANSI(underline[1]));
	t.end();
});

test('nested', t => {
	let { yellow, red, bold, cyan } = CODES;
	let expect = ANSI(yellow[0]) + 'foo ' + ANSI(bold[0]) + ANSI(red[0]) + 'red' + ANSI(yellow[0]) + ANSI(bold[1]) + ' bar ' + ANSI(cyan[0]) + 'cyan' + ANSI(yellow[0]) + ' baz' + ANSI(yellow[1]);
	t.is(c.yellow(`foo ${c.red.bold('red')} bar ${c.cyan('cyan')} baz`), expect);
	t.is(c.yellow('foo', c.red.bold('red'), 'bar', c.cyan('cyan'), 'baz'), expect);
	t.end();
});

test('printf', t => {
	let { bold, red } = CODES;
	let aaa = c.red.bold('%s:%s', 'foo', 'bar', 'baz');
	t.is(aaa, ANSI(bold[0]) + ANSI(red[0]) + 'foo:bar baz' + ANSI(red[1]) + ANSI(bold[1]));
	let bbb = c.bold('%s:%s:%s', 'foo', c.red('bar'), 'baz');
	t.is(bbb, ANSI(bold[0]) + 'foo:' + ANSI(red[0]) + 'bar' + ANSI(red[1]) + ':baz' + ANSI(bold[1]));
	t.end();
});

test('clear', t => {
	t.is(typeof c.clear, 'function', 'kleur.clear is a function');
	t.is(c.clear(c.blue.bold('foo bar baz')), 'foo bar baz', '~> strips all codes');
	t.end();
});

test('multiline', t => {
	let { blue, bold, red, italic } = CODES;
	t.is(c.blue('hello\nworld'), ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + '\n' + ANSI(blue[0]) + 'world' + ANSI(blue[1]), '~> basic');
	t.is(c.blue.bold('hello\nworld'), ANSI(bold[0]) + ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(bold[1]), '~> simple chain');
	t.is(c.italic.bold(`${c.red('hello')}\n${c.blue('world')}`), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'hello' + ANSI(red[1]) + ANSI(italic[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(italic[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(italic[1]) + ANSI(bold[1]), '~> chain w/ nested');
	t.end();
});

test('disabled', t => {
	c.enabled = false;
	t.is(c.red.bold('foobar'), 'foobar', '~> equiv of clear()');
	t.end();
});
