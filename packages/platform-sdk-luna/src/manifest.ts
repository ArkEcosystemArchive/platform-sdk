import LunaMainnet from "./networks/luna/mainnet";
import LunaTestnet from "./networks/luna/testnet";

export const manifest = {
	name: "Terra",
	networks: {
		"luna.mainnet": LunaMainnet,
		"luna.testnet": LunaTestnet,
	},
};
