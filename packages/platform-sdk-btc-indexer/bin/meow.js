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
			concurrentDownloads: {
				type: "number",
				default: 100,
			},
			batchSize: {
				type: "number",
				default: 5,
			},
			downloader: {
				type: "boolean",
				default: false,
			},
		},
	},
);
