"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const zil_mainnet_1 = __importDefault(require("./networks/zil.mainnet"));
const zil_testnet_1 = __importDefault(require("./networks/zil.testnet"));
exports.manifest = {
	name: "ZIL",
	networks: {
		"zil.mainnet": zil_mainnet_1.default,
		"zil.testnet": zil_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
