import ArkMainnet from "./networks/avax/mainnet.json";
import ArkTestnet from "./networks/avax/testnet.json";

export const manifest = {
	name: "ARK",
	networks: {
		"avax.mainnet": ArkMainnet,
		"avax.testnet": ArkTestnet,
	},
};
