#!/usr/bin/env node

const meow = require("meow");

module.exports =  meow(
	`
	Usage
	  $ dot <input>

	Options
	Options
	  --polkadot, -p  The Polkadot RPC host (defaults to wss://rpc.polkadot.io)
	  --elasticsearch, -e  The ElasticSearch host (defaults to http://localhost:9200)
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
			elasticsearch: {
				type: "string",
				alias: "e",
				default: "http://localhost:9200",
			},
		},
	},
);
