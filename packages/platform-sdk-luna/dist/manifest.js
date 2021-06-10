"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const luna_mainnet_1 = __importDefault(require("./networks/luna.mainnet"));
const luna_testnet_1 = __importDefault(require("./networks/luna.testnet"));
exports.manifest = {
	name: "LUNA",
	networks: {
		"luna.mainnet": luna_mainnet_1.default,
		"luna.testnet": luna_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
