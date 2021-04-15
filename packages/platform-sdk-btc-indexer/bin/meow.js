#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ pbtc <input>
`,
	{
		flags: {
			coin: {
				type: "string",
				alias: "c",
				default: "btc",
			},
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
