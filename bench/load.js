console.time('chalk');
const chalk = require('chalk');
console.timeEnd('chalk');

console.time('kleur');
const kleur = require('..');
console.timeEnd('kleur');

console.time('ansi-colors');
const color = require('ansi-colors');
console.timeEnd('ansi-colors');
