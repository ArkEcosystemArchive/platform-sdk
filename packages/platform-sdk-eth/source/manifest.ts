import EthGoerli from "./networks/eth.goerli";
import EthKovan from "./networks/eth.kovan";
import EthMainnet from "./networks/eth.mainnet";
import EthRinkeby from "./networks/eth.rinkeby";
import EthRopsten from "./networks/eth.ropsten";

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
