"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signMessage = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const signMessage = async (wallet) => {
	helpers_1.renderLogo();
	const { mnemonic, message } = await prompts_1.default([
		{
			type: "text",
			name: "message",
			message: "Please enter the message:",
			validate: (value) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!message) {
		return;
	}
	if (!mnemonic) {
		return;
	}
	helpers_1.useLogger().info(
		JSON.stringify(
			await wallet.message().sign({
				message,
				signatory: await wallet.coin().signatory().mnemonic(mnemonic),
			}),
		),
	);
};
exports.signMessage = signMessage;
//# sourceMappingURL=sign-message.js.map
