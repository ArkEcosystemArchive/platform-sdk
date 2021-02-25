import AdaMainnet from "./networks/ada/mainnet";
import AdaTestnet from "./networks/ada/testnet";

export const manifest = {
	name: "Cardano",
	networks: {
		"ada.mainnet": AdaMainnet,
		"ada.testnet": AdaTestnet,
	},
};
