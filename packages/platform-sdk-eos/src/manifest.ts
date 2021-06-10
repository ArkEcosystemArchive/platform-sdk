import BosMainnet from "./networks/bos.mainnet";
import EosMainnet from "./networks/eos.mainnet";
import EosTestnet from "./networks/eos.testnet";
import MeetoneMainnet from "./networks/meetone.mainnet";
import TelosMainnet from "./networks/telos.mainnet";
import TelosTestnet from "./networks/telos.testnet";
import WaxMainnet from "./networks/wax.mainnet";
import WorbliMainnet from "./networks/worbli.mainnet";
import WorbliTestnet from "./networks/worbli.testnet";

export const manifest = {
	name: "EOS",
	networks: {
		"eos.mainnet": EosMainnet,
		"eos.testnet": EosTestnet,
		"telos.mainnet": TelosMainnet,
		"telos.testnet": TelosTestnet,
		"wax.mainnet": WaxMainnet,
		"worbli.mainnet": WorbliMainnet,
		"worbli.testnet": WorbliTestnet,
		"meetone.mainnet": MeetoneMainnet,
		"bos.mainnet": BosMainnet,
	},
};
