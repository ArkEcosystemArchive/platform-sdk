import * as XrpMainnet from "./networks/xrp/mainnet.json";
import * as XrpTestnet from "./networks/xrp/testnet.json";

export const manifest = {
	name: "XRP",
	networks: {
		"xrp.mainnet": XrpMainnet,
		"xrp.testnet": XrpTestnet,
	},
};
