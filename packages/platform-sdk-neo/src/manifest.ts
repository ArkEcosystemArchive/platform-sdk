export const manifest = {
	name: "NEO",
	networks: {
		"neo.mainnet": require("./networks/neo/mainnet.json"),
		"neo.testnet": require("./networks/neo/testnet.json"),
	},
};
