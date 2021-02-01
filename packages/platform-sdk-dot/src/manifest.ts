import AdaMainnet from "./networks/dot/mainnet.json";
import AdaTestnet from "./networks/dot/testnet.json";

export const manifest = {
	name: "Polkadot",
	networks: {
		"dot.mainnet": AdaMainnet,
		"dot.testnet": AdaTestnet,
	},
};
