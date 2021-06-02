#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ pnei <input>
`,
	{
		flags: {
			host: {
				type: "string",
			},
			key: {
				type: "string",
			},
		},
	},
);
