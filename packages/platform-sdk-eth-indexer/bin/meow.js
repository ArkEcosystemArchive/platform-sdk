#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ peth <input>
`,
	{
		flags: {
			coin: {
				type: "string",
				alias: "c",
				default: "eth",
			},
			network: {
				type: "string",
				alias: "c",
				default: "mainnet",
			},
			rpc: {
				type: "string",
			},
			wss: {
				type: "string",
			},
			database: {
				type: "string",
			},
		},
	},
);
