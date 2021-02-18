#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ peth <input>
`,
	{
		flags: {
			host: {
				type: "string",
			},
			coin: {
				type: "string",
				alias: "c",
				default: "eth",
			},
		},
	},
);
