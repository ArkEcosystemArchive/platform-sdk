"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const avax_mainnet_1 = __importDefault(require("./networks/avax.mainnet"));
const avax_testnet_1 = __importDefault(require("./networks/avax.testnet"));
exports.manifest = {
	name: "AVAX",
	networks: {
		"avax.mainnet": avax_mainnet_1.default,
		"avax.testnet": avax_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
