import TrxMainnet from "./networks/trx.mainnet";
import TrxTestnet from "./networks/trx.testnet";

export const manifest = {
	name: "TRX",
	networks: {
		"trx.mainnet": TrxMainnet,
		"trx.testnet": TrxTestnet,
	},
};
