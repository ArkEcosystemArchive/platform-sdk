import AdaMainnet from "./networks/ada/mainnet.json";
import AdaTestnet from "./networks/ada/testnet.json";

export const manifest = {
	name: "Cardano",
	networks: {
		"ada.mainnet": AdaMainnet,
		"ada.testnet": AdaTestnet,
	},
};
