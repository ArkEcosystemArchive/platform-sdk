import DotMainnet from "./networks/dot.mainnet";
import KsmMainnet from "./networks/ksm.mainnet";

export const manifest = {
	name: "DOT",
	networks: {
		"dot.mainnet": DotMainnet,
		"ksm.mainnet": KsmMainnet,
	},
};
