import CosmosMainnet from "./networks/cosmos/mainnet";
import CosmosTestnet from "./networks/cosmos/testnet";

export const manifest = {
	name: "ATOM",
	networks: {
		"cosmos.mainnet": CosmosMainnet,
		"cosmos.testnet": CosmosTestnet,
	},
};
