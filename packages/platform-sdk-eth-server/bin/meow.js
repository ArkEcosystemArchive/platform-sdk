#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ seth <input>
`,
	{
		flags: {
			coin: {
				type: "string",
				default: "eth",
			},
			network: {
				type: "string",
				default: "mainnet",
			},
			host: {
				type: "string",
				default: "0.0.0.0",
			},
			port: {
				type: "number",
				default: 3000,
			},
			database: {
				type: "string",
			},
		},
	},
);
