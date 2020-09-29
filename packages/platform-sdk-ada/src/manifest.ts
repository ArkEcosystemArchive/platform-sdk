export const manifest = {
	name: "Cardano",
	networks: {
		"ada.mainnet": require("./networks/ada/mainnet.json"),
		"ada.testnet": require("./networks/ada/testnet.json"),
	},
};
