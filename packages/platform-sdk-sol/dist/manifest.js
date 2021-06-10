"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const sol_mainnet_1 = __importDefault(require("./networks/sol.mainnet"));
const sol_testnet_1 = __importDefault(require("./networks/sol.testnet"));
exports.manifest = {
	name: "SOL",
	networks: {
		"sol.mainnet": sol_mainnet_1.default,
		"sol.testnet": sol_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
