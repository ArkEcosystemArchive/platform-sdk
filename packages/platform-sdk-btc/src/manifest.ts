export const manifest = {
	name: "BTC",
	networks: {
		"btc.livenet": require("./networks/btc/livenet.json"),
		"btc.testnet": require("./networks/btc/testnet.json"),
	},
};
