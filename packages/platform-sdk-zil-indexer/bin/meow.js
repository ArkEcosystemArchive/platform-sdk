#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ pzil <input>
`,
	{
		flags: {
			network: {
				type: "string",
				alias: "c",
				default: "mainnet",
			},
			host: {
				type: "string",
			},
			database: {
				type: "string",
			},
		},
	},
);
