const { Suite } = require('benchmark');
const color = require('ansi-colors');
const chalk = require('chalk');
const kleur = require('..');

// All color/method names
const names = ['reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];

function bench(name) {
  console.log(`\n# ${name}`);
  const suite = new Suite();
	const previous = suite.add.bind(suite);
	suite.on('cycle', e => console.log('  ' + e.target));
	suite.add = (name, runner) => previous(name.padEnd(16), runner);
  return suite;
}


bench('All Colors')
  .add('ansi-colors', () => {
    names.forEach(name => color[name]('foo'));
  })
  .add('chalk', () => {
    names.forEach(name => chalk[name]('foo'));
  })
  .add('kleur', () => {
    names.forEach(name => kleur[name]('foo'));
  })
  .run();


bench('Stacked colors')
  .add('ansi-colors', () => {
    names.forEach(name => color[name].bold.underline.italic('foo'));
  })
  .add('chalk', () => {
    names.forEach(name => chalk[name].bold.underline.italic('foo'));
  })
  .add('kleur', () => {
    names.forEach(name => kleur[name]().bold().underline().italic('foo'));
  })
  .run();


bench('Nested colors')
  .add('ansi-colors', () => fixture(color))
  .add('chalk', () => fixture(chalk))
  .add('kleur', () => fixture(kleur))
  .run();


function fixture(lib) {
  return lib.red(`a red ${lib.white('red')} red ${lib.red('red')} red ${lib.gray('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.blue('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')}red ${lib.green('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.magenta('red')} red ${lib.red('red')}red ${lib.red('red')} red ${lib.cyan('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.yellow('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} red ${lib.red('red')} message`);
}
