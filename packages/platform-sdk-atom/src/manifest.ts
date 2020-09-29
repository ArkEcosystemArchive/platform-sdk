import CosmosMainnet from "./networks/cosmos/mainnet.json";
import CosmosTestnet from "./networks/cosmos/testnet.json";
import TerraMainnet from "./networks/terra/mainnet.json";
import TerraTestnet from "./networks/terra/testnet.json";

export const manifest = {
	name: "ATOM",
	networks: {
		"cosmos.mainnet": CosmosMainnet,
		"cosmos.testnet": CosmosTestnet,
		"terra.mainnet": TerraMainnet,
		"terra.testnet": TerraTestnet,
	},
};
