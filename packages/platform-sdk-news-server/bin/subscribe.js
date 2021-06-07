#!/usr/bin/env node

const { subscribe } = require("../dist/index.js");

const { flags } = require("./meow");

// eslint-disable-next-line @typescript-eslint/no-floating-promises
subscribe(flags);
