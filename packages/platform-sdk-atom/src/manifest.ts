import * as CosmosMainnet from "./networks/cosmos/mainnet.json";
import * as CosmosTestnet from "./networks/cosmos/testnet.json";
import * as TerraMainnet from "./networks/terra/mainnet.json";
import * as TerraTestnet from "./networks/terra/testnet.json";

export const manifest = {
	name: "ATOM",
	networks: {
		"cosmos.mainnet": CosmosMainnet,
		"cosmos.testnet": CosmosTestnet,
		"terra.mainnet": TerraMainnet,
		"terra.testnet": TerraTestnet,
	},
};
