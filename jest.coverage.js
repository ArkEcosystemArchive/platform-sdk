const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/**/index.ts",
		"!**/node_modules/**",
		"!src/(container|contracts|manifest|schema|service-provider).ts",
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
