import BosMainnet from "./networks/bos/mainnet.json";
import EosMainnet from "./networks/eos/mainnet.json";
import EosTestnet from "./networks/eos/testnet.json";
import MeetoneMainnet from "./networks/meetone/mainnet.json";
import TelosMainnet from "./networks/telos/mainnet.json";
import TelosTestnet from "./networks/telos/testnet.json";
import WaxMainnet from "./networks/wax/mainnet.json";
import WorbliMainnet from "./networks/worbli/mainnet.json";
import WorbliTestnet from "./networks/worbli/testnet.json";

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
