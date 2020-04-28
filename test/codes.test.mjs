import tap from 'tap';
import CODES from './constants.mjs';
import { ANSI } from './ansi.mjs';
import c from '../index.mjs';

tap.test('codes', (t) => {
	let k, tmp, val;
	for (k in CODES) {
		tmp = CODES[k];
		val = c[k]('~foobar~');
		t.comment(`:: kleur.${k} ::`);
		t.is(typeof c[k], 'function', `is a function`);
		t.is(typeof c[k]().bold, 'function', '~> and is chainable');
		t.is(typeof val, 'string', 'returns a string value');
		t.is(val, ANSI(tmp[0]) + '~foobar~' + ANSI(tmp[1]), '~> matches expected');
	}
	t.end();
});
