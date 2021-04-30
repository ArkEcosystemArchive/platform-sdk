const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	collectCoverage: false,
	collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!**/node_modules/**"],
	coverageDirectory: "<rootDir>/.coverage",
	coverageReporters: ["json", "lcov", "text", "clover", "html"],
	coverageThreshold: {
		global: {
			branches: 75,
			functions: 75,
			lines: 75,
			statements: 75,
		},
	},
};
