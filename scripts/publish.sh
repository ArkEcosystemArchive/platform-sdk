#!/usr/bin/env bash

# Update
rush update --purge

# Build
rush build

# Publish
NPM_AUTH_TOKEN=$1 rush publish --publish --set-access-level=public --include-all
