import tap from 'tap';
import c from '../index.mjs';

tap.test('kleur', t => {
	t.is(typeof c, 'object', 'exports an object');
	t.ok(c.enabled, 'colors enabled by default');
	t.end();
});
