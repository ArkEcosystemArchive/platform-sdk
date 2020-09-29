export const manifest = {
	name: "EOS",
	networks: {
		"eos.mainnet": require("./networks/eos/mainnet.json"),
		"eos.testnet": require("./networks/eos/testnet.json"),
		"telos.mainnet": require("./networks/telos/mainnet.json"),
		"telos.testnet": require("./networks/telos/testnet.json"),
		"wax.mainnet": require("./networks/wax/mainnet.json"),
		"worbli.mainnet": require("./networks/worbli/mainnet.json"),
		"worbli.testnet": require("./networks/worbli/testnet.json"),
		"meetone.mainnet": require("./networks/meetone/mainnet.json"),
		"bos.mainnet": require("./networks/bos/mainnet.json"),
	},
};
