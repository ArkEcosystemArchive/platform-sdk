const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!**/node_modules/**"],
	coverageDirectory: "<rootDir>/.coverage",
	coverageReporters: ["json", "lcov", "text", "clover", "html"],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
};
