import NeoMainnet from "./networks/neo.mainnet";
import NeoTestnet from "./networks/neo.testnet";

export const manifest = {
	name: "NEO",
	networks: {
		"neo.mainnet": NeoMainnet,
		"neo.testnet": NeoTestnet,
	},
};
