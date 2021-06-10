"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWallet = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const joi_1 = __importDefault(require("joi"));
const helpers_1 = require("../helpers");
const registerWallet = () => [
	{
		name: "wallet.generate",
		async method({ coin, network }) {
			const instance = await helpers_1.makeCoin({ coin, network });
			const mnemonic = platform_sdk_crypto_1.BIP39.generate();
			return {
				address: await instance.address().fromMnemonic(mnemonic),
				publicKey: await instance.publicKey().fromMnemonic(mnemonic),
				mnemonic,
			};
		},
		schema: joi_1.default.object(helpers_1.baseSchema).required(),
	},
];
exports.registerWallet = registerWallet;
//# sourceMappingURL=wallet.js.map
