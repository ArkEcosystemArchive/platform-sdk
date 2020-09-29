import * as TrxMainnet from "./networks/trx/mainnet.json";
import * as TrxTestnet from "./networks/trx/testnet.json";

export const manifest = {
	name: "TRX",
	networks: {
		"trx.mainnet": TrxMainnet,
		"trx.testnet": TrxTestnet,
	},
};
