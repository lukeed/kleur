import tap from 'tap';
import c from '../index.mjs';

tap.test('disabled', (t) => {
	c.enabled = false;
	t.is(c.red('foo'), 'foo', '~> raw text only');
	t.is(c.red().italic().bold('foobar'), 'foobar', '~> chaining okay');
	t.end();
});
