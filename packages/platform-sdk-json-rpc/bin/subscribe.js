#!/usr/bin/env node

const { subscribe } = require("../distribution");

const { flags } = require("./meow");

// eslint-disable-next-line @typescript-eslint/no-floating-promises
subscribe(flags);
