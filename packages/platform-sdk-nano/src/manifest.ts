import NanoMainnet from "./networks/nano/mainnet";
import NanoTestnet from "./networks/nano/testnet";

export const manifest = {
	name: "NANO",
	networks: {
		"nano.mainnet": NanoMainnet,
		"nano.testnet": NanoTestnet,
	},
};
