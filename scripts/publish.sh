#!/usr/bin/env bash

# Publish
NPM_AUTH_TOKEN=$2 rush publish --publish --set-access-level=public --include-all
