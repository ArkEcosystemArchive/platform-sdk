#!/usr/bin/env bash

# Bump
for dir in `find packages -mindepth 1 -maxdepth 1 -type d | sort -nr`; do
    cd $dir
    echo $PWD
    npm version $1
    cd ../..
done

# Branch (Requires GitHub CLI)
git checkout -b $1
git add -A
git commit -m "release: $1"
git push
gh pr create --base master --fill --title="release: $1"
