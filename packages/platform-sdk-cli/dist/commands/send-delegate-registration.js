"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDelegateRegistration = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const sendDelegateRegistration = async (wallet) => {
	helpers_1.renderLogo();
	const { mnemonic, username } = await prompts_1.default([
		{
			type: "text",
			name: "username",
			message: "Please enter the username:",
			validate: (value) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!username) {
		return;
	}
	if (!mnemonic) {
		return;
	}
	await helpers_2.finaliseTransaction(wallet, mnemonic, "signDelegateRegistration", { username });
};
exports.sendDelegateRegistration = sendDelegateRegistration;
//# sourceMappingURL=send-delegate-registration.js.map
