const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	collectCoverage: false,
	collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!**/node_modules/**"],
	coverageDirectory: "<rootDir>/.coverage",
	coverageReporters: ["json", "lcov", "text", "clover", "html"],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 99,
			lines: 99,
			statements: 99,
		},
	},
};
