import * as kleur from '../';

console.log('Colors');
console.log(kleur.black('kleur'));
console.log(kleur.red('kleur'));
console.log(kleur.green('kleur'));
console.log(kleur.yellow('kleur'));
console.log(kleur.blue('kleur'));
console.log(kleur.magenta('kleur'));
console.log(kleur.cyan('kleur'));
console.log(kleur.white('kleur'));
console.log(kleur.gray('kleur'));

console.log('\nBackground Colors');
console.log(kleur.bgBlack('kleur'));
console.log(kleur.bgRed('kleur'));
console.log(kleur.bgGreen('kleur'));
console.log(kleur.bgYellow('kleur'));
console.log(kleur.bgBlue('kleur'));
console.log(kleur.bgMagenta('kleur'));
console.log(kleur.bgCyan('kleur'));
console.log(kleur.bgWhite('kleur'));

console.log('\nModifiers');
console.log(kleur.reset('kleur: reset'));
console.log(kleur.bold('kleur: bold'));
console.log(kleur.dim('kleur: dim'));
console.log(kleur.italic('kleur: italic'));
console.log(kleur.underline('kleur: underline'));
console.log(kleur.inverse('kleur: inverse'));
console.log(kleur.hidden('kleur: hidden'));
console.log(kleur.strikethrough('kleur: strikethrough'));

console.log('\nChainability');
console.log(kleur.bgRed.white.bold.underline('kluer'));
console.log(kleur.white.bold.bgGreen.inverse('kluer'));

console.log(kleur.clear(kleur.red('\nClear formatting: kleur')));
