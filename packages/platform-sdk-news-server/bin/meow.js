#!/usr/bin/env node

const meow = require("meow");

module.exports = meow(
	`
	Usage
	  $ pnes <input>
`,
	{
		flags: {
			host: {
				type: "string",
				default: "0.0.0.0",
			},
			port: {
				type: "number",
				default: 3000,
			},
		},
	},
);
