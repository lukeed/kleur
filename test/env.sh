#!/usr/bin/env bash

faketty() {
	script -qfc "$(printf "%q " "$@")" /dev/null
}

node -p "process.stdout.isTTY"
node -p "process.stdout.isTTY" | cat
faketty node -p "process.stdout.isTTY"

node -r esm test/xyz.js
node -r esm test/xyz.js | cat
echo `node -r esm test/xyz.js`

faketty node -r esm test/xyz.js
faketty node -r esm test/xyz.js | cat
echo `faketty node -r esm test/xyz.js`
