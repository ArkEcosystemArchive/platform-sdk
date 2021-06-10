"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLogo = exports.useEnvironment = exports.useLogger = void 0;
const platform_sdk_ada_1 = require("@arkecosystem/platform-sdk-ada");
const platform_sdk_ark_1 = require("@arkecosystem/platform-sdk-ark");
// import { ATOM } from "@arkecosystem/platform-sdk-atom";
const platform_sdk_avax_1 = require("@arkecosystem/platform-sdk-avax");
// import { BTC } from "@arkecosystem/platform-sdk-btc";
const platform_sdk_dot_1 = require("@arkecosystem/platform-sdk-dot");
const platform_sdk_egld_1 = require("@arkecosystem/platform-sdk-egld");
const platform_sdk_trx_1 = require("@arkecosystem/platform-sdk-trx");
const platform_sdk_xlm_1 = require("@arkecosystem/platform-sdk-xlm");
// import { XRP } from "@arkecosystem/platform-sdk-xrp";
const platform_sdk_http_got_1 = require("@arkecosystem/platform-sdk-http-got");
// import { EOS } from "@arkecosystem/platform-sdk-eos";
// import { ETH } from "@arkecosystem/platform-sdk-eth";
const platform_sdk_lsk_1 = require("@arkecosystem/platform-sdk-lsk");
const platform_sdk_profiles_1 = require("@arkecosystem/platform-sdk-profiles");
// import { NEO } from "@arkecosystem/platform-sdk-neo";
const platform_sdk_sol_1 = require("@arkecosystem/platform-sdk-sol");
const cfonts_1 = __importDefault(require("cfonts"));
const storage_1 = require("./storage");
const useLogger = () => console;
exports.useLogger = useLogger;
const useEnvironment = async () => {
	const env = new platform_sdk_profiles_1.Environment({
		coins: {
			ADA: platform_sdk_ada_1.ADA,
			ARK: platform_sdk_ark_1.ARK,
			// ATOM,
			AVAX: platform_sdk_avax_1.AVAX,
			// BTC,
			DOT: platform_sdk_dot_1.DOT,
			EGLD: platform_sdk_egld_1.EGLD,
			// EOS,
			// ETH,
			LSK: platform_sdk_lsk_1.LSK,
			// NEO,
			SOL: platform_sdk_sol_1.SOL,
			TRX: platform_sdk_trx_1.TRX,
			XLM: platform_sdk_xlm_1.XLM,
			// XRP,
		},
		storage: new storage_1.ConfStorage(),
		httpClient: new platform_sdk_http_got_1.Request(),
	});
	await env.verify();
	await env.boot();
	return env;
};
exports.useEnvironment = useEnvironment;
const renderLogo = () => {
	console.clear();
	cfonts_1.default.say("Plutus", {
		gradient: ["#14b8a6", "#0891b2"],
		independentGradient: true,
		transitionGradient: true,
	});
};
exports.renderLogo = renderLogo;
//# sourceMappingURL=helpers.js.map
