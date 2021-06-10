"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const neo_mainnet_1 = __importDefault(require("./networks/neo.mainnet"));
const neo_testnet_1 = __importDefault(require("./networks/neo.testnet"));
exports.manifest = {
	name: "NEO",
	networks: {
		"neo.mainnet": neo_mainnet_1.default,
		"neo.testnet": neo_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
