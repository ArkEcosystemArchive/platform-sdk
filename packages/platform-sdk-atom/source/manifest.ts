import AtomMainnet from "./networks/atom.mainnet";
import AtomTestnet from "./networks/atom.testnet";

export const manifest = {
	name: "ATOM",
	networks: {
		"atom.mainnet": AtomMainnet,
		"atom.testnet": AtomTestnet,
	},
};
