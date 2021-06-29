#!/usr/bin/env bash

for dir in `find packages -mindepth 1 -maxdepth 1 -type d | sort -nr`; do
	cd $dir
	echo $PWD
	node ../../common/scripts/manifest-updater.js
	cd ../..
done
