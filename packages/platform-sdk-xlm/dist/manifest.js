"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const xlm_mainnet_1 = __importDefault(require("./networks/xlm.mainnet"));
const xlm_testnet_1 = __importDefault(require("./networks/xlm.testnet"));
exports.manifest = {
	name: "XLM",
	networks: {
		"xlm.mainnet": xlm_mainnet_1.default,
		"xlm.testnet": xlm_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
