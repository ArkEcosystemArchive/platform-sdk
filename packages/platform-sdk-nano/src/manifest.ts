import TerraMainnet from "./networks/terra/mainnet";
import TerraTestnet from "./networks/terra/testnet";

export const manifest = {
	name: "Terra",
	networks: {
		"terra.mainnet": TerraMainnet,
		"terra.testnet": TerraTestnet,
	},
};
