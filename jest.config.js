module.exports = {
	bail: false,
	collectCoverage: false,
	collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!**/node_modules/**"],
	coverageDirectory: "<rootDir>/.coverage",
	coverageReporters: ["json", "lcov", "text", "clover", "html"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	setupFilesAfterEnv: ["jest-extended", "jest-localstorage-mock"],
	testEnvironment: "node",
	testMatch: ["**/*.test.ts"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	verbose: false,
	globals: {
		"ts-jest": {
			packageJson: "./package.json",
		},
	},
};
