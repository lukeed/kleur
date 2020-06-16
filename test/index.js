import test from 'tape';
import CODES from './codes';
import c from '..';

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
		t.is(typeof c[k]().bold, 'function', '~> and is chainable');
		t.is(typeof val, 'string', 'returns a string value');
		t.is(val, ANSI(tmp[0]) + '~foobar~' + ANSI(tmp[1]), '~> matches expected');
	}
	t.end();
});

test('chains', t => {
	let val = '~foobar~';
	let { bold, underline, italic, bgRed, red, green, yellow } = CODES;
	t.is(c.red().bold(val), ANSI(red[0]) + ANSI(bold[0]) + val + ANSI(red[1]) + ANSI(bold[1]));
	t.is(c.bold().yellow().bgRed().italic(val), ANSI(bold[0]) + ANSI(yellow[0]) + ANSI(bgRed[0]) + ANSI(italic[0]) + val + ANSI(bold[1]) + ANSI(yellow[1]) + ANSI(bgRed[1]) + ANSI(italic[1]));
	t.is(c.green().bold().underline(val), ANSI(green[0]) + ANSI(bold[0]) + ANSI(underline[0]) + val + ANSI(green[1]) + ANSI(bold[1]) + ANSI(underline[1]));
	t.end();
});

test('nested', t => {
	let { yellow, red, bold, cyan, dim } = CODES;
	t.is(
		c.red(`foo ${c.yellow('bar')} baz`),
		ANSI(red[0]) + 'foo ' + ANSI(yellow[0]) + 'bar' + ANSI(yellow[1]) + ANSI(red[0]) + ' baz' + ANSI(red[1])
	);
	t.is(
		c.bold(`foo ${c.red().dim('bar')} baz`),
		ANSI(bold[0]) + 'foo ' + ANSI(red[0]) + ANSI(dim[0]) + 'bar' + ANSI(red[1]) + ANSI(dim[1]) + ANSI(bold[0]) + ' baz' + ANSI(bold[1])
	);
	t.is(
		c.yellow(`foo ${c.red().bold('red')} bar ${c.cyan('cyan')} baz`),
		ANSI(yellow[0]) + 'foo ' + ANSI(red[0]) + ANSI(bold[0]) + 'red' + ANSI(red[1]) + ANSI(yellow[0]) + ANSI(bold[1]) + ' bar ' + ANSI(cyan[0]) + 'cyan' + ANSI(cyan[1]) + ANSI(yellow[0]) + ' baz' + ANSI(yellow[1])
	);
	t.end();
});

test('integer', t => {
	let { red, blue, italic } = CODES;
	t.is(c.blue(123), ANSI(blue[0]) + '123' + ANSI(blue[1]), '~> basic');
	t.is(c.red().italic(0), ANSI(red[0]) + ANSI(italic[0]) + '0' + ANSI(red[1]) + ANSI(italic[1]), '~> chain w/ 0');
	t.is(c.italic(`${c.red(123)} ${c.blue(0)}`), ANSI(italic[0]) + ANSI(red[0]) + '123' + ANSI(red[1]) + ' ' + ANSI(blue[0]) + '0' + ANSI(blue[1]) + ANSI(italic[1]), '~> chain w/ nested & 0');
	t.is(c.blue(-1), ANSI(blue[0]) + '-1' + ANSI(blue[1]), '~> basic w/ negatives');
	t.end();
});

// test('multiline', t => {
// 	let { blue, bold, red, italic } = CODES;
// 	t.is(c.blue('hello\nworld'), ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + '\n' + ANSI(blue[0]) + 'world' + ANSI(blue[1]), '~> basic');
// 	t.is(c.blue.bold('hello\nworld'), ANSI(bold[0]) + ANSI(blue[0]) + 'hello' + ANSI(blue[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(bold[1]), '~> simple chain');
// 	t.is(c.italic.bold(`${c.red('hello')}\n${c.blue('world')}`), ANSI(bold[0]) + ANSI(italic[0]) + ANSI(red[0]) + 'hello' + ANSI(red[1]) + ANSI(italic[1]) + ANSI(bold[1]) + '\n' + ANSI(bold[0]) + ANSI(italic[0]) + ANSI(blue[0]) + 'world' + ANSI(blue[1]) + ANSI(italic[1]) + ANSI(bold[1]), '~> chain w/ nested');
// 	t.end();
// });

test('partial require', t => {
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

test('named chains', t => {
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

test('disabled', t => {
	c.enabled = false;
	t.is(c.red('foo'), 'foo', '~> raw text only');
	t.is(c.red().italic().bold('foobar'), 'foobar', '~> chaining okay');
	t.end();
});
