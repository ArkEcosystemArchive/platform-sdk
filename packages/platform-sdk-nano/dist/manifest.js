"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const nano_mainnet_1 = __importDefault(require("./networks/nano.mainnet"));
exports.manifest = {
	name: "NANO",
	networks: {
		"nano.mainnet": nano_mainnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
