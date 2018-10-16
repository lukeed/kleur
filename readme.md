<div align="center">
  <img src="shots/logo.png" alt="kleur" height="120" />
</div>

<div align="center">
  <a href="https://npmjs.org/package/kleur">
    <img src="https://img.shields.io/npm/v/kleur.svg" alt="version" />
  </a>
  <a href="https://travis-ci.org/lukeed/kleur">
    <img src="https://img.shields.io/travis/lukeed/kleur.svg" alt="travis" />
  </a>
  <a href="https://npmjs.org/package/kleur">
    <img src="https://img.shields.io/npm/dm/kleur.svg" alt="downloads" />
  </a>
</div>

<div align="center">The fastest Node.js library for formatting terminal text with ANSI colors~!</div>

## Features

* No dependencies
* Super [lightweight](#load-time) & [performant](#performance)
* Supports [nested](#nested-methods) & [chained](#chained-methods) colors
* No `String.prototype` modifications
* Supports [`printf`](#printf-formatting) formatting
* Conditional [color support](#conditional-support)
* Familiar [API](#api)

_Heavily inspired by [`ansi-colors`](https://github.com/doowb/ansi-colors). See [Credits](#credits) for more info!_


## Install

```
$ npm install --save kleur
```


## Usage

```js
const kleur = require('kleur');

// basic usage
kleur.red('red text');

// or variadic arguments
kleur.red('this', 'is', 'also', 'red');

// or printf formatting
kleur.red('%s, %s!', 'hello', 'world');

// chained methods
kleur.blue.bold.underline('howdy partner');

// nested methods
kleur.bold(`${ kleur.bgRed.white('[ERROR]') } ${ kleur.red.italic('Something happened')}`);
```

### Chained Methods

```js
console.log(kleur.bold.red('this is a bold red message'));
console.log(kleur.bold.italic('this is a bold italicized message'));
console.log(kleur.bold.yellow.bgRed.italic('this is a bold yellow italicized message'));
console.log(kleur.green.bold.underline('this is a bold green underlined message'));
```

<img src="shots/1.png" width="300" />

### Nested Methods

```js
const { yellow, red, cyan } = require('kleur');

// with template literals
console.log(yellow(`foo ${red.bold('red')} bar ${cyan('cyan')} baz`));

// or variadic arguments
console.log(yellow('foo', red.bold('red'), 'bar', cyan('cyan'), 'baz'));
```

<img src="shots/2.png" width="300" />


### `printf` Formatting

> See [`util.format`](https://nodejs.org/api/util.html#util_util_format_format_args) for documentation

```js
const { yellow, bgGreen, bold } = require('kleur');

// basic usage
console.log(bold.cyan('%s, %s!', 'Hello', 'World', '-Anonymous'));

// or with nested colors
console.log( bold('%s-like %s... %s!', 'printf', bgGreen.black('formatting'), yellow('YAY')) );
```

<img src="shots/3.png" width="300" />


### Clear Formatting

Manually strip all ANSI codes from a given string.

```js
let str = kleur.blue('Howdy partner');
//=> styled

kleur.clear(str);
//=> 'Howdy partner'
```

### Conditional Support

Toggle color support as needed; `kleur` assumes it's always enabled.

```js
const kleur = require('kleur');

// manually disable
kleur.enabled = false;

// or use a library to detect support
kleur.enabled = require('color-support').stdout;

console.log(kleur.red('I will only be colored red if the terminal supports colors'));
```


## API

Any `kleur` method returns a `String` (when invoked, not chained). It's up to the developer to pass the output to destinations like `console.log`, `process.stdout.write`, etc.

The methods below are grouped by type for legbility purposes only. They each can be [chained](#chained-methods) or [nested](#nested-methods) with one another.

***Colors:***
> black &mdash; red &mdash; green &mdash; yellow &mdash; blue &mdash; magenta &mdash; cyan &mdash; white &mdash; gray

***Backgrounds:***
> bgBlack &mdash; bgRed &mdash; bgGreen &mdash; bgYellow &mdash; bgBlue &mdash; bgMagenta &mdash; bgCyan &mdash; bgWhite

***Modifiers:***
> reset &mdash; bold &mdash; dim &mdash; italic* &mdash; underline &mdash; inverse &mdash; hidden &mdash; strikethrough*

<sup>* <em>Not widely supported</em></sup>


## Benchmarks

> Using Node v8.9.0

### Load time

```
ansi-colors: 1.172ms
chalk: 11.799ms
clorox: 0.922ms
kleur: 0.694ms
```

### Performance

```
# All Colors
  ansi-colors x 60,235 ops/sec ±0.57% (93 runs sampled)
  chalk x 7,125 ops/sec ±4.23% (69 runs sampled)
  clorox x 1,175 ops/sec ±3.95% (71 runs sampled)
  kleur x 74,307 ops/sec ±0.40% (96 runs sampled)

# Stacked colors
  ansi-colors x 13,547 ops/sec ±0.15% (97 runs sampled)
  chalk x 1,631 ops/sec ±4.83% (72 runs sampled)
  clorox x 454 ops/sec ±2.43% (40 runs sampled)
  kleur x 21,825 ops/sec ±0.31% (94 runs sampled)

# Nested colors
  ansi-colors x 27,553 ops/sec ±0.45% (93 runs sampled)
  chalk x 3,445 ops/sec ±4.31% (69 runs sampled)
  clorox x 552 ops/sec ±2.79% (45 runs sampled)
  kleur x 32,405 ops/sec ±0.36% (92 runs sampled)
```


## Credits

This project (inadvertently) is very similar to [Brian Woodward](https://github.com/doowb)'s awesome [`ansi-colors`](https://github.com/doowb/ansi-colors) project. My original implementation involved writing into a global state &mdash; first by writing into an output string, and then by saving the `keys` array into the `$` directly. Both approaches were leaky & allowed for accidental chains/overwrites. In turn, I borrowed `ansi-colors`'s approach in writing `keys` state into each chain directly.

Aside from the performance boost, `kleur` exists as a separate module because I've no need for bright color variants nor the symbols. And since those are defining features of `ansi-colors`, they're not something that can be removed.

The benchmark suite is also imported directly from `ansi-colors` :raised_hands:


## License

MIT © [Luke Edwards](https://lukeed.com)
