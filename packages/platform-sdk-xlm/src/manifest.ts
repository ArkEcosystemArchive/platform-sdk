import * as XlmMainnet from "./networks/xlm/mainnet.json";
import * as XlmTestnet from "./networks/xlm/testnet.json";

export const manifest = {
	name: "XLM",
	networks: {
		"xlm.mainnet": XlmMainnet,
		"xlm.testnet": XlmTestnet,
	},
};
