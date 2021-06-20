#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ psdk <input>
`,
	{
		flags: {
			host: {
				type: "string",
				default: "0.0.0.0",
			},
			port: {
				type: "number",
				default: 3100,
			},
			points: {
				type: "number",
				default: 5,
			},
			duration: {
				type: "number",
				default: 1,
			},
			whitelist: {
				type: "string",
				default: "",
			},
			blacklist: {
				type: "string",
				default: "",
			},
		},
	},
);
