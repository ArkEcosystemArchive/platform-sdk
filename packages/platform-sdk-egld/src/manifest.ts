import ElrondMainnet from "./networks/egld/mainnet";
import ElrondTestnet from "./networks/egld/testnet";

export const manifest = {
	name: "Elrond",
	networks: {
		"egld.mainnet": ElrondMainnet,
		"egld.testnet": ElrondTestnet,
	},
};
