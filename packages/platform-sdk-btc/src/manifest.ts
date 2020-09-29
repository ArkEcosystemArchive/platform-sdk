import * as BtcLivenet from "./networks/btc/livenet.json";
import * as BtcTestnet from "./networks/btc/testnet.json";

export const manifest = {
	name: "BTC",
	networks: {
		"btc.livenet": BtcLivenet,
		"btc.testnet": BtcTestnet,
	},
};
