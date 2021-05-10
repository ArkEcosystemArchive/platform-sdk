import ZilliqaMainnet from "./networks/zil/mainnet";
import ZilliqaTestnet from "./networks/zil/testnet";

export const manifest = {
	name: "ZIL",
	networks: {
		"zil.mainnet": ZilliqaMainnet,
		"zil.testnet": ZilliqaTestnet,
	},
};
