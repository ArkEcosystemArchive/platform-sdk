#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ pnews <input>
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
