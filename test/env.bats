#!/usr/bin/env bats

# vim:ft=bash:

# CMD='node -r esm ./test/xyz.js'
CMD='node --trace-warnings -r esm ./test/xyz.js'
COLOR=$'\E[31mfoo\E[39m'
NO_COLOR='foo'

faketty() {
	script -qfc "$(printf "%q " "$@")" /dev/null | tr -d '\r'
}

# process.stdout.isTTY = undefined;

@test "[tty=false] FORCE_COLOR=?" {
	result=$($CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] FORCE_COLOR=" {
	result=$(FORCE_COLOR= $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] FORCE_COLOR=''" {
	result=$(FORCE_COLOR='' $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] FORCE_COLOR=0" {
	result=$(FORCE_COLOR=0 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NODE_DISABLE_COLORS=1" {
	result=$(NODE_DISABLE_COLORS=1 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NODE_DISABLE_COLORS=1; FORCE_COLOR=1" {
	result=$(NODE_DISABLE_COLORS=1 FORCE_COLOR=1 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=" {
	result=$(NO_COLOR= $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=''" {
	result=$(NO_COLOR='' $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=0" {
	result=$(NO_COLOR=0 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=1" {
	result=$(NO_COLOR=1 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=yes" {
	result=$(NO_COLOR=yes $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=; FORCE_COLOR=1" {
	result=$(NO_COLOR= FORCE_COLOR=1 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=0; FORCE_COLOR=1" {
	result=$(NO_COLOR=0 FORCE_COLOR=1 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] NO_COLOR=1; FORCE_COLOR=1" {
	result=$(NO_COLOR=1 FORCE_COLOR=1 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] FORCE_COLOR=1" {
	result=$(FORCE_COLOR=1 $CMD)
	[ "$result" = "$COLOR" ]
}

@test "[tty=false] FORCE_COLOR=2" {
	result=$(FORCE_COLOR=2 $CMD)
	[ "$result" = "$COLOR" ]
}

@test "[tty=false] TERM=dumb; FORCE_COLOR=1" {
	result=$(TERM=dumb FORCE_COLOR=1 $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=false] TERM=dumb" {
	result=$(TERM=dumb $CMD)
	[ "$result" = "$NO_COLOR" ]
}

# process.stdout.isTTY = true;

@test "[tty=true] FORCE_COLOR=?" {
	result=$(faketty $CMD)
	[ "$result" = "$COLOR" ]
}

@test "[tty=true] FORCE_COLOR=" {
	result=$(FORCE_COLOR= faketty $CMD)
	[ "$result" = "$COLOR" ]
}

@test "[tty=true] FORCE_COLOR=''" {
	result=$(FORCE_COLOR='' faketty $CMD)
	[ "$result" = "$COLOR" ]
}

@test "[tty=true] FORCE_COLOR=0" {
	result=$(FORCE_COLOR=0 faketty $CMD)
	[ "$result" = "$COLOR" ]
}

@test "[tty=true] NODE_DISABLE_COLORS=1" {
	result=$(NODE_DISABLE_COLORS=1 faketty $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NODE_DISABLE_COLORS=1; FORCE_COLOR=1" {
	result=$(NODE_DISABLE_COLORS=1 FORCE_COLOR=1 faketty $CMD)
	printf "XXX result: [%q]" "$result"
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NO_COLOR=" {
	result=$(NO_COLOR= faketty $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NO_COLOR=''" {
	result=$(NO_COLOR='' faketty $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NO_COLOR=0" {
	result=$(NO_COLOR=0 faketty $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NO_COLOR=1" {
	result=$(NO_COLOR=1 faketty $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NO_COLOR=; FORCE_COLOR=1" {
	result=$(NO_COLOR= FORCE_COLOR=1 faketty $CMD)
	printf "XXX result: [%q]" "$result"
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NO_COLOR=0; FORCE_COLOR=1" {
	result=$(NO_COLOR=0 FORCE_COLOR=1 faketty $CMD)
	printf "XXX result: [%q]" "$result"
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] NO_COLOR=1; FORCE_COLOR=1" {
	result=$(NO_COLOR=1 FORCE_COLOR=1 faketty $CMD)
	printf "XXX result: [%q]" "$result"
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] TERM=dumb; FORCE_COLOR=1" {
	result=$(TERM=dumb FORCE_COLOR=1 faketty $CMD)
	[ "$result" = "$NO_COLOR" ]
}

@test "[tty=true] FORCE_COLOR=1" {
	result=$(FORCE_COLOR=1 faketty $CMD)
	[ "$result" = "$COLOR" ]
}

@test "[tty=true] FORCE_COLOR=2" {
	result=$(FORCE_COLOR=2 faketty $CMD)
	[ "$result" = "$COLOR" ]
}
