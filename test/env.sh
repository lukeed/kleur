#!usr/bin/env bash

faketty() {
	script -qfc "$(printf "%q " "$@")" /dev/null
}

node -p "process.stdout.isTTY"
node -p "process.stdout.isTTY" | cat
faketty node -p "process.stdout.isTTY"
