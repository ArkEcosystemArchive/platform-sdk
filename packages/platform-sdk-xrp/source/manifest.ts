import XrpMainnet from "./networks/xrp.mainnet";
import XrpTestnet from "./networks/xrp.testnet";

export const manifest = {
	name: "XRP",
	networks: {
		"xrp.mainnet": XrpMainnet,
		"xrp.testnet": XrpTestnet,
	},
};
