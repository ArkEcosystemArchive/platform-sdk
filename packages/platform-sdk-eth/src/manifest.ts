export const manifest = {
	name: "ETH",
	networks: {
		"eth.mainnet": require("./networks/eth/mainnet.json"),
		"eth.kovan": require("./networks/eth/kovan.json"),
		"eth.ropsten": require("./networks/eth/ropsten.json"),
		"eth.rinkeby": require("./networks/eth/rinkeby.json"),
		"eth.goerli": require("./networks/eth/goerli.json"),
	},
};
