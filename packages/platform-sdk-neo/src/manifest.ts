import * as NeoMainnet from "./networks/neo/mainnet.json";
import * as NeoTestnet from "./networks/neo/testnet.json";

export const manifest = {
	name: "NEO",
	networks: {
		"neo.mainnet": NeoMainnet,
		"neo.testnet": NeoTestnet,
	},
};
