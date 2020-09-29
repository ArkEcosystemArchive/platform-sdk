import * as LskMainnet from "./networks/lsk/mainnet.json";
import * as LskTestnet from "./networks/lsk/testnet.json";
import * as LskBetanet from "./networks/lsk/betanet.json";

export const manifest = {
	name: "LSK",
	networks: {
		"lsk.mainnet": LskMainnet,
		"lsk.testnet": LskTestnet,
		"lsk.betanet": LskBetanet,
	},
};
