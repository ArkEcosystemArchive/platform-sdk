import EthMainnet from "./networks/eth/mainnet.json";
import EthKovan from "./networks/eth/kovan.json";
import EthRopsten from "./networks/eth/ropsten.json";
import EthRinkeby from "./networks/eth/rinkeby.json";
import EthGoerli from "./networks/eth/goerli.json";

export const manifest = {
	name: "ETH",
	networks: {
		"eth.mainnet": EthMainnet,
		"eth.kovan": EthKovan,
		"eth.ropsten": EthRopsten,
		"eth.rinkeby": EthRinkeby,
		"eth.goerli": EthGoerli,
	},
};
