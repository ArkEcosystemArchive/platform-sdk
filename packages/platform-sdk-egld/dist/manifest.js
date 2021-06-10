"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const egld_mainnet_1 = __importDefault(require("./networks/egld.mainnet"));
const egld_testnet_1 = __importDefault(require("./networks/egld.testnet"));
exports.manifest = {
	name: "EGLD",
	networks: {
		"egld.mainnet": egld_mainnet_1.default,
		"egld.testnet": egld_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
