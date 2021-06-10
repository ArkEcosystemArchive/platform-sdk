"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const dot_mainnet_1 = __importDefault(require("./networks/dot.mainnet"));
const ksm_mainnet_1 = __importDefault(require("./networks/ksm.mainnet"));
exports.manifest = {
	name: "DOT",
	networks: {
		"dot.mainnet": dot_mainnet_1.default,
		"ksm.mainnet": ksm_mainnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
