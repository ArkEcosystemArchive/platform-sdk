"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const eth_goerli_1 = __importDefault(require("./networks/eth.goerli"));
const eth_kovan_1 = __importDefault(require("./networks/eth.kovan"));
const eth_mainnet_1 = __importDefault(require("./networks/eth.mainnet"));
const eth_rinkeby_1 = __importDefault(require("./networks/eth.rinkeby"));
const eth_ropsten_1 = __importDefault(require("./networks/eth.ropsten"));
exports.manifest = {
	name: "ETH",
	networks: {
		"eth.mainnet": eth_mainnet_1.default,
		"eth.kovan": eth_kovan_1.default,
		"eth.ropsten": eth_ropsten_1.default,
		"eth.rinkeby": eth_rinkeby_1.default,
		"eth.goerli": eth_goerli_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
