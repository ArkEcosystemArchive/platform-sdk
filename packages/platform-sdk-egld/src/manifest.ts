import ElrondMainnet from "./networks/egld/mainnet";
import ElrondTestnet from "./networks/egld/testnet";

export const manifest = {
	name: "EGLD",
	networks: {
		"egld.mainnet": ElrondMainnet,
		"egld.testnet": ElrondTestnet,
	},
};
