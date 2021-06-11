#!/usr/bin/env bash

# Publish
NPM_AUTH_TOKEN=$1 rush publish --publish --set-access-level=public --include-all
