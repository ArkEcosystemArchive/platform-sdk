import * as EosMainnet from "./networks/eos/mainnet.json";
import * as EosTestnet from "./networks/eos/testnet.json";
import * as TelosMainnet from "./networks/telos/mainnet.json";
import * as TelosTestnet from "./networks/telos/testnet.json";
import * as WaxMainnet from "./networks/wax/mainnet.json";
import * as WorbliMainnet from "./networks/worbli/mainnet.json";
import * as WorbliTestnet from "./networks/worbli/testnet.json";
import * as MeetoneMainnet from "./networks/meetone/mainnet.json";
import * as BosMainnet from "./networks/bos/mainnet.json";

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
