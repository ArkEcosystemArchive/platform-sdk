"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const bos_mainnet_1 = __importDefault(require("./networks/bos.mainnet"));
const eos_mainnet_1 = __importDefault(require("./networks/eos.mainnet"));
const eos_testnet_1 = __importDefault(require("./networks/eos.testnet"));
const meetone_mainnet_1 = __importDefault(require("./networks/meetone.mainnet"));
const telos_mainnet_1 = __importDefault(require("./networks/telos.mainnet"));
const telos_testnet_1 = __importDefault(require("./networks/telos.testnet"));
const wax_mainnet_1 = __importDefault(require("./networks/wax.mainnet"));
const worbli_mainnet_1 = __importDefault(require("./networks/worbli.mainnet"));
const worbli_testnet_1 = __importDefault(require("./networks/worbli.testnet"));
exports.manifest = {
	name: "EOS",
	networks: {
		"eos.mainnet": eos_mainnet_1.default,
		"eos.testnet": eos_testnet_1.default,
		"telos.mainnet": telos_mainnet_1.default,
		"telos.testnet": telos_testnet_1.default,
		"wax.mainnet": wax_mainnet_1.default,
		"worbli.mainnet": worbli_mainnet_1.default,
		"worbli.testnet": worbli_testnet_1.default,
		"meetone.mainnet": meetone_mainnet_1.default,
		"bos.mainnet": bos_mainnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
