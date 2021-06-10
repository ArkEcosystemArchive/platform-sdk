"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDelegateResignation = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const sendDelegateResignation = async (wallet) => {
	helpers_1.renderLogo();
	const { mnemonic, amount, to, memo } = await prompts_1.default([
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!mnemonic) {
		return;
	}
	await helpers_2.finaliseTransaction(wallet, mnemonic, "signDelegateResignation");
};
exports.sendDelegateResignation = sendDelegateResignation;
//# sourceMappingURL=send-delegate-resignation.js.map
