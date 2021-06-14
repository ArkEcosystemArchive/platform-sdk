const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	collectCoverage: true,
	collectCoverageFrom: [
		"source/**/*.ts",
		"!source/**/index.ts",
		"!**/node_modules/**",
		"!source/(container|contracts|manifest|schema|service-provider).ts",
	],
	coverageDirectory: "<rootDir>/.coverage",
	coverageReporters: ["json", "lcov", "text", "clover", "html"],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
};
