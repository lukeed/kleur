console.time('chalk');
const chalk = require('chalk');
console.timeEnd('chalk');

console.time('kleur');
const kleur = require('../index');
console.timeEnd('kleur');

console.time('kleur/colors');
const colors = require('../colors');
console.timeEnd('kleur/colors');

console.time('ansi-colors');
const color = require('ansi-colors');
console.timeEnd('ansi-colors');

console.time('colorette');
const colorette = require('colorette');
console.timeEnd('colorette');
