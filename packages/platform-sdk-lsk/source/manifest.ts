import LskMainnet from "./networks/lsk.mainnet";
import LskTestnet from "./networks/lsk.testnet";

export const manifest = {
	name: "LSK",
	networks: {
		"lsk.mainnet": LskMainnet,
		"lsk.testnet": LskTestnet,
	},
};
