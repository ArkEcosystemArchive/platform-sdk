import ArkMainnet from "./networks/ark/mainnet.json";
import ArkDevnet from "./networks/ark/devnet.json";
import CompendiaMainnet from "./networks/compendia/mainnet.json";
import CompendiaTestnet from "./networks/compendia/testnet.json";

export const manifest = {
	name: "ARK",
	networks: {
		"ark.mainnet": ArkMainnet,
		"ark.devnet": ArkDevnet,
		"compendia.mainnet": CompendiaMainnet,
		"compendia.testnet": CompendiaTestnet,
	},
};
