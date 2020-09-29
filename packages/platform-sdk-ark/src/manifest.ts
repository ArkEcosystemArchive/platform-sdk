import * as ArkMainnet from "./networks/ark/mainnet.json";
import * as ArkDevnet from "./networks/ark/devnet.json";
import * as CompendiaMainnet from "./networks/compendia/mainnet.json";
import * as CompendiaTestnet from "./networks/compendia/testnet.json";

export const manifest = {
	name: "ARK",
	networks: {
		"ark.mainnet": ArkMainnet,
		"ark.devnet": ArkDevnet,
		"compendia.mainnet": CompendiaMainnet,
		"compendia.testnet": CompendiaTestnet,
	},
};
