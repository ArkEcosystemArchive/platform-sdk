import ZilliqaMainnet from "./networks/zil/mainnet";
import ZilliqaTestnet from "./networks/zil/testnet";

export const manifest = {
	name: "Zilliqa",
	networks: {
		"zil.mainnet": ZilliqaMainnet,
		"zil.testnet": ZilliqaTestnet,
	},
};
