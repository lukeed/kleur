#!/usr/bin/env bash

code=0
fail() {
  printf "\x1b[31m[FAIL]\x1b[39m %s\n" "$@" >&2
	code=1
}

colors() {
	printf "GOT: %s\n" "$1"
	[ "$1" != "foo" ] || fail "$2"
}

nocolor() {
	[ "$1" == "foo" ] || fail "$2"
}

faketty() {
	script -qfc "$(printf "%q " "$@")" /dev/null
}

# process.stdout.isTTY = undefined;
printf "\nprocess.stdout.isTTY = %s;\n" `node -p "process.stdout.isTTY"`
nocolor `node -p "require('.').red('foo')"` "FORCE_COLOR=?"
nocolor `FORCE_COLOR=0 node -p "require('.').red('foo')"` "FORCE_COLOR=0"
nocolor `NODE_DISABLE_COLORS=1 node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1;"
nocolor `NODE_DISABLE_COLORS=1 FORCE_COLOR=1 node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1; FORCE_COLOR=1"
colors `FORCE_COLOR=1 node -p "require('.').red('foo')"` "FORCE_COLOR=1"

# process.stdout.isTTY = true;
printf "\nprocess.stdout.isTTY = true;\n"
colors `node -r esm test/xyz.js` "FORCE_COLOR=?"
nocolor `FORCE_COLOR=0 node -r esm test/xyz.js` "FORCE_COLOR=0"
nocolor `NODE_DISABLE_COLORS=1 node -r esm test/xyz.js` "NODE_DISABLE_COLORS=1;"
nocolor `NODE_DISABLE_COLORS=1 FORCE_COLOR=1 node -r esm test/xyz.js` "NODE_DISABLE_COLORS=1; FORCE_COLOR=1"
colors `FORCE_COLOR=1 node -r esm test/xyz.js` "FORCE_COLOR=1"
nocolor `TERM=dumb node -r esm test/xyz.js` "TERM=dumb"

# process.stdout.isTTY = true;
printf "\n(faketty) process.stdout.isTTY = %s;\n" `faketty node -p "process.stdout.isTTY"`
colors `faketty node -p "require('.').red('foo')"` "FORCE_COLOR=?"
nocolor `FORCE_COLOR=0 faketty node -p "require('.').red('foo')"` "FORCE_COLOR=0"
nocolor `NODE_DISABLE_COLORS=1 faketty node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1;"
nocolor `NODE_DISABLE_COLORS=1 FORCE_COLOR=1 faketty node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1; FORCE_COLOR=1"
colors `FORCE_COLOR=1 faketty node -p "require('.').red('foo')"` "FORCE_COLOR=1"
nocolor `TERM=dumb node -r esm test/xyz.js` "TERM=dumb"

if [ "$code" == "0" ]; then
	printf "\x1b[32m[PASS]\x1b[39m $.enabled updates correctly \n"
fi

exit $code
