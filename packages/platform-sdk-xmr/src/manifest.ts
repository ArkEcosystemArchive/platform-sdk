import * as XmrMainnet from "./networks/xmr/mainnet.json";
import * as XmrTestnet from "./networks/xmr/testnet.json";

export const manifest = {
	name: "XMR",
	networks: {
		"xmr.mainnet": XmrMainnet,
		"xmr.testnet": XmrTestnet,
	},
};
