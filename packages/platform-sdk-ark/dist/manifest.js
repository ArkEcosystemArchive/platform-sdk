"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const ark_devnet_1 = __importDefault(require("./networks/ark.devnet"));
const ark_mainnet_1 = __importDefault(require("./networks/ark.mainnet"));
const bind_mainnet_1 = __importDefault(require("./networks/bind.mainnet"));
const bind_testnet_1 = __importDefault(require("./networks/bind.testnet"));
exports.manifest = {
	name: "ARK",
	networks: {
		"ark.mainnet": ark_mainnet_1.default,
		"ark.devnet": ark_devnet_1.default,
		"bind.mainnet": bind_mainnet_1.default,
		"bind.testnet": bind_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
