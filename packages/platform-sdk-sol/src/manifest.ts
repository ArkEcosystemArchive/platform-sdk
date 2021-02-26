import SolMainnet from "./networks/sol/mainnet";
import SolTestnet from "./networks/sol/testnet";

export const manifest = {
	name: "Solana",
	networks: {
		"sol.mainnet": SolMainnet,
		"sol.testnet": SolTestnet,
	},
};
