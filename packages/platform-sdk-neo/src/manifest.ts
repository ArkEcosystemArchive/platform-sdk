import NeoMainnet from "./networks/neo/mainnet.json";
import NeoTestnet from "./networks/neo/testnet.json";

export const manifest = {
	name: "NEO",
	networks: {
		"neo.mainnet": NeoMainnet,
		"neo.testnet": NeoTestnet,
	},
};
