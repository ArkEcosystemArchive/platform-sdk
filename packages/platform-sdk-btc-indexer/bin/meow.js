#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ pbtc <input>
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
			batchSize: {
				type: "integer",
				"default": 50,
			},
		},
	},
);
