"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const lsk_mainnet_1 = __importDefault(require("./networks/lsk.mainnet"));
const lsk_testnet_1 = __importDefault(require("./networks/lsk.testnet"));
exports.manifest = {
	name: "LSK",
	networks: {
		"lsk.mainnet": lsk_mainnet_1.default,
		"lsk.testnet": lsk_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
