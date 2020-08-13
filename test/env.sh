#!/usr/bin/env bash

code=0
fail() {
  printf "\x1b[31m[FAIL]\x1b[39m %s\n" "$@" >&2
	code=1
}

colors() {
	printf "\x1b[33m[DEBUG]\x1b[39m \"%s\" :: %s \n" "$2" "$1"
	[ "$1" != "foo" ] || fail "$2"
}

nocolor() {
	printf "\x1b[33m[DEBUG]\x1b[39m \"%s\" :: %s \n" "$2" "$1"
	[[ "$1" =~ foo* ]] || fail "$2"
}

faketty() {
	script -qfc "$(printf "%q " "$@")" /dev/null
}

# process.stdout.isTTY = undefined;
printf "\nprocess.stdout.isTTY = %s;\n" `node -p "process.stdout.isTTY"`
nocolor `node -p "require('.').red('foo')"` "FORCE_COLOR=?"
nocolor `FORCE_COLOR=0 node -p "require('.').red('foo')"` "FORCE_COLOR=0"
nocolor `NODE_DISABLE_COLORS=1 node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1"
nocolor `NODE_DISABLE_COLORS=1 FORCE_COLOR=1 node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1; FORCE_COLOR=1"
nocolor `NO_COLOR=1 node -p "require('.').red('foo')"` "NO_COLOR=1"
nocolor `NO_COLOR=1 FORCE_COLOR=1 node -p "require('.').red('foo')"` "NO_COLOR=1; FORCE_COLOR=1"
colors `FORCE_COLOR=1 node -p "require('.').red('foo')"` "FORCE_COLOR=1"
nocolor `TERM=dumb FORCE_COLOR=1 node -p "require('.').red('foo')"` "TERM=dumb; FORCE_COLOR=1"
nocolor `TERM=dumb node -p "require('.').red('foo')"` "TERM=dumb"

# process.stdout.isTTY = true;
printf "\n(faketty) process.stdout.isTTY = %s;\n" `faketty node -p "process.stdout.isTTY"`
colors `faketty node -p "require('.').red('foo')"` "FORCE_COLOR=?"
colors `FORCE_COLOR=0 faketty node -p "require('.').red('foo')"` "FORCE_COLOR=0"
nocolor `NODE_DISABLE_COLORS=1 faketty node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1"
nocolor `NODE_DISABLE_COLORS=1 FORCE_COLOR=1 faketty node -p "require('.').red('foo')"` "NODE_DISABLE_COLORS=1; FORCE_COLOR=1"
nocolor `NO_COLOR=1 faketty node -p "require('.').red('foo')"` "NO_COLOR=1"
nocolor `NO_COLOR=1 FORCE_COLOR=1 faketty node -p "require('.').red('foo')"` "NO_COLOR=1; FORCE_COLOR=1"
nocolor `TERM=dumb FORCE_COLOR=1 faketty node -p "require('.').red('foo')"` "TERM=dumb; FORCE_COLOR=1"
colors `FORCE_COLOR=1 faketty node -p "require('.').red('foo')"` "FORCE_COLOR=1"
nocolor `TERM=dumb node -r esm test/xyz.js` "TERM=dumb"

if [ "$code" == "0" ]; then
	printf "\x1b[32m[PASS]\x1b[39m $.enabled updates correctly \n"
fi

exit $code
