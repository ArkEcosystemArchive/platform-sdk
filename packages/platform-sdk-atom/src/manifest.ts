import CosmosMainnet from "./networks/cosmos/mainnet";
import CosmosTestnet from "./networks/cosmos/testnet";
import TerraMainnet from "./networks/terra/mainnet";
import TerraTestnet from "./networks/terra/testnet";

export const manifest = {
	name: "ATOM",
	networks: {
		"cosmos.mainnet": CosmosMainnet,
		"cosmos.testnet": CosmosTestnet,
		"terra.mainnet": TerraMainnet,
		"terra.testnet": TerraTestnet,
	},
};
