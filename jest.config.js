module.exports = {
	bail: false,
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	setupFilesAfterEnv: ["jest-extended", "jest-localstorage-mock"],
	testEnvironment: "node",
	testMatch: ["**/*.test.ts"],
	transform: {
		"^.+\\.(t|j)sx?$": "ts-jest",
	},
	verbose: true,
};
