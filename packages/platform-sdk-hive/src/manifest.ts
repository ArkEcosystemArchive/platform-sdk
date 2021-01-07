import HiveMainnet from "./networks/hive/mainnet.json";
import HiveTestnet from "./networks/hive/testnet.json";

export const manifest = {
	name: "HIVE",
	networks: {
		"hive.mainnet": HiveMainnet,
		"hive.testnet": HiveTestnet,
	},
};
