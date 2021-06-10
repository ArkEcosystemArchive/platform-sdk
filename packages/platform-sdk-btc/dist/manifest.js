"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const btc_livenet_1 = __importDefault(require("./networks/btc.livenet"));
const btc_testnet_1 = __importDefault(require("./networks/btc.testnet"));
exports.manifest = {
	name: "BTC",
	networks: {
		"btc.livenet": btc_livenet_1.default,
		"btc.testnet": btc_testnet_1.default,
	},
};
//# sourceMappingURL=manifest.js.map
