export const manifest = {
	name: "ATOM",
	networks: {
		"cosmos.mainnet": require("./networks/cosmos/mainnet.json"),
		"cosmos.testnet": require("./networks/cosmos/testnet.json"),
		"terra.mainnet": require("./networks/terra/mainnet.json"),
		"terra.testnet": require("./networks/terra/testnet.json"),
	},
};
