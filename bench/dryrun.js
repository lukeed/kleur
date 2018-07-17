const libs = {
  chalk: require('chalk'),
  clorox: require('clorox'),
  colors: require('ansi-colors'),
  kleur: require('../foo')
};

const color = libs[process.argv[2] || 'kleur'];
[
	'black', 'blue', 'cyan', 'green', 'magenta', 'red', 'white', 'yellow', 'dim', 'gray',
	'bgBlack', 'bgBlue', 'bgCyan', 'bgGreen', 'bgMagenta', 'bgRed', 'bgWhite', 'bgYellow',
	'hidden', 'inverse', 'bold', 'italic', 'reset', 'strikethrough', 'underline'
].forEach(str => {
	console.log(color[str]('~foobar~'));
});

console.log(color['cyan']('[info]'));

console.log();
console.log(color.bold(color.cyan('[info]')), color.cyan('This is some information'));
console.log(color.bold(color.yellow('[warning]')), color.yellow('This is a warning'));
console.log(color.bold(color.red('[ERROR]')), color.red('Danger! There was an error!'));
console.log();

console.log(color.red(`a red ${color.white('white')} red ${color.red('red')} red ${color.gray('gray')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.blue('blue')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')}red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')}red ${color.green('green')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.magenta('red')} red ${color.red('red')}red ${color.red('red')} red ${color.cyan('cyan')} red ${color.red('red')} red ${color.red('red')} red ${color.yellow('yellow')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.blue('blue')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} red ${color.red('red')} message`).toString());
