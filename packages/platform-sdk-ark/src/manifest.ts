export const manifest = {
	name: "ARK",
	networks: {
		"ark.mainnet": require("./networks/ark/mainnet.json"),
		"ark.devnet": require("./networks/ark/devnet.json"),
		"compendia.mainnet": require("./networks/compendia/mainnet.json"),
		"compendia.testnet": require("./networks/compendia/testnet.json"),
	},
};
