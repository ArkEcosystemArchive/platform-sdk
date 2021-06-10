#!/usr/bin/env sh

npm i ts-morph

node common/scripts/ast-helper.js platform-sdk-ada
node common/scripts/ast-helper.js platform-sdk-ark
# TODO add more

