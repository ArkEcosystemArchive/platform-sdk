import BtcLivenet from "./networks/btc.livenet";
import BtcTestnet from "./networks/btc.testnet";

export const manifest = {
	name: "BTC",
	networks: {
		"btc.livenet": BtcLivenet,
		"btc.testnet": BtcTestnet,
	},
};
