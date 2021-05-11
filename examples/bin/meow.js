#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ example <input>
`,
	{},
);
