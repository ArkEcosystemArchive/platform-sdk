#!/usr/bin/env node

const meow = require("meow");
const { subscribe } = require("../dist/index.js");

const { flags } = meow(
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
			elasticsearch: {
				type: "string",
				alias: "e",
				default: "http://localhost:9200",
			},
		},
	},
);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
subscribe(flags);
