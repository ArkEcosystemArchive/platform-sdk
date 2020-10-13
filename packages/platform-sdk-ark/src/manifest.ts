import ArkDevnet from "./networks/ark/devnet.json";
import ArkMainnet from "./networks/ark/mainnet.json";
import CompendiaMainnet from "./networks/compendia/mainnet.json";

export const manifest = {
	name: "ARK",
	networks: {
		"ark.mainnet": ArkMainnet,
		"ark.devnet": ArkDevnet,
		"compendia.mainnet": CompendiaMainnet,
	},
};
