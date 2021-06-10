"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const atom_mainnet_1 = __importDefault(require("./networks/atom.mainnet"));
const atom_testnet_1 = __importDefault(require("./networks/atom.testnet"));
exports.manifest = {
	name: "ATOM",
	networks: {
		"atom.mainnet": atom_mainnet_1.default,
		"atom.testnet": atom_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
