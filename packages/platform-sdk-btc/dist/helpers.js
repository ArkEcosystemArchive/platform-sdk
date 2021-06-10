"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v });
		  }
		: function (o, v) {
				o["default"] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworkConfig = exports.getNetworkID = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const getNetworkID = (config) => config.get("network").id.split(".")[1];
exports.getNetworkID = getNetworkID;
const getNetworkConfig = (config) => {
	if (exports.getNetworkID(config) === "livenet") {
		return bitcoin.networks.bitcoin;
	}
	return bitcoin.networks.testnet;
};
exports.getNetworkConfig = getNetworkConfig;
//# sourceMappingURL=helpers.js.map
