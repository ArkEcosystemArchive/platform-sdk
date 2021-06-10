#!/usr/bin/env sh

npm i ts-morph

node common/scripts/manifest-updater.js platform-sdk-ada
node common/scripts/manifest-updater.js platform-sdk-ark
# TODO add more

