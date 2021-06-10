import AvaxMainnet from "./networks/avax.mainnet";
import AvaxTestnet from "./networks/avax.testnet";

export const manifest = {
	name: "AVAX",
	networks: {
		"avax.mainnet": AvaxMainnet,
		"avax.testnet": AvaxTestnet,
	},
};
