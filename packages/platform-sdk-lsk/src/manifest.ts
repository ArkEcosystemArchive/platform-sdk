export const manifest = {
	name: "LSK",
	networks: {
		"lsk.mainnet": require("./networks/lsk/mainnet.json"),
		"lsk.testnet": require("./networks/lsk/testnet.json"),
		"lsk.betanet": require("./networks/lsk/betanet.json"),
	},
};
