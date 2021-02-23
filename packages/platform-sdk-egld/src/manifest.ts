import ElrondMainnet from "./networks/egld/mainnet";
import ElrondTestnet from "./networks/egld/testnet";

export const manifest = {
	name: "Cardano",
	networks: {
		"egld.mainnet": ElrondMainnet,
		"egld.testnet": ElrondTestnet,
	},
};
