"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSecondSignatureRegistration = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const sendSecondSignatureRegistration = async (wallet) => {
	helpers_1.renderLogo();
	const { mnemonic, secondMnemonic } = await prompts_1.default([
		{
			type: "password",
			name: "secondMnemonic",
			message: "Please enter your secondary mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!secondMnemonic) {
		return;
	}
	if (!mnemonic) {
		return;
	}
	await helpers_2.finaliseTransaction(wallet, mnemonic, "signSecondSignature", { mnemonic: secondMnemonic });
};
exports.sendSecondSignatureRegistration = sendSecondSignatureRegistration;
//# sourceMappingURL=send-second-signature-registration.js.map
