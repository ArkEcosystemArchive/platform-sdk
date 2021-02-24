#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ dot <input>

	Options
	Options
	  --polkadot, -p  The Polkadot RPC host (defaults to wss://rpc.polkadot.io)
	  --database, -d  The file for the sqlite database (defaults to 'dot')
`,
	{
		flags: {
			coin: {
				type: "string",
				alias: "c",
				default: "dot",
			},
			polkadot: {
				type: "string",
				alias: "p",
				default: "wss://rpc.polkadot.io",
			},
			database: {
				type: "string",
				alias: "d",
				default: "dot",
			},
		},
	},
);
