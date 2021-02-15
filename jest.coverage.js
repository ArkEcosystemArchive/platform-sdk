const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!**/node_modules/**"],
	coverageDirectory: "<rootDir>/.coverage",
	coverageReporters: ["json", "lcov", "text", "clover", "html"],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
};
