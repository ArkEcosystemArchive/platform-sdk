"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const xrp_mainnet_1 = __importDefault(require("./networks/xrp.mainnet"));
const xrp_testnet_1 = __importDefault(require("./networks/xrp.testnet"));
exports.manifest = {
	name: "XRP",
	networks: {
		"xrp.mainnet": xrp_mainnet_1.default,
		"xrp.testnet": xrp_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
