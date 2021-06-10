"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const trx_mainnet_1 = __importDefault(require("./networks/trx.mainnet"));
const trx_testnet_1 = __importDefault(require("./networks/trx.testnet"));
exports.manifest = {
	name: "TRX",
	networks: {
		"trx.mainnet": trx_mainnet_1.default,
		"trx.testnet": trx_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
