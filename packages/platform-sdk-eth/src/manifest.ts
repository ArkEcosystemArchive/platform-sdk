import * as EthMainnet from "./networks/eth/mainnet.json";
import * as EthKovan from "./networks/eth/kovan.json";
import * as EthRopsten from "./networks/eth/ropsten.json";
import * as EthRinkeby from "./networks/eth/rinkeby.json";
import * as EthGoerli from "./networks/eth/goerli.json";

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
