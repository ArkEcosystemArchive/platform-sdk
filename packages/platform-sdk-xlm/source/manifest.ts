import XlmMainnet from "./networks/xlm.mainnet";
import XlmTestnet from "./networks/xlm.testnet";

export const manifest = {
	name: "XLM",
	networks: {
		"xlm.mainnet": XlmMainnet,
		"xlm.testnet": XlmTestnet,
	},
};
