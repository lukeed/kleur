console.time('ansi-colors');
const color = require('ansi-colors');
console.timeEnd('ansi-colors');

console.time('chalk');
const chalk = require('chalk');
console.timeEnd('chalk');

console.time('clorox');
const clorox = require('clorox');
console.timeEnd('clorox');

console.time('kleur');
const kleur = require('..');
console.timeEnd('kleur');
