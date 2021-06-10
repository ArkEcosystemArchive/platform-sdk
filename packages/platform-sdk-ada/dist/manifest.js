"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const ada_mainnet_1 = __importDefault(require("./networks/ada.mainnet"));
const ada_testnet_1 = __importDefault(require("./networks/ada.testnet"));
exports.manifest = {
	name: "ADA",
	networks: {
		"ada.mainnet": ada_mainnet_1.default,
		"ada.testnet": ada_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
