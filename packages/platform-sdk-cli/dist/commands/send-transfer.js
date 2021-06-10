"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransfer = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const sendTransfer = async (wallet) => {
	helpers_1.renderLogo();
	const { mnemonic, amount, to, memo } = await prompts_1.default([
		{
			type: "text",
			name: "to",
			message: "Please enter the recipient:",
			validate: (value) => value !== undefined,
		},
		{
			type: "text",
			name: "amount",
			message: "Please enter the amount:",
			validate: (value) => platform_sdk_support_1.BigNumber.make(value).isGreaterThan(0),
		},
		{
			type: "text",
			name: "memo",
			message: "Please enter the memo:",
			validate: (value) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!to) {
		return;
	}
	if (!amount) {
		return;
	}
	if (!mnemonic) {
		return;
	}
	await helpers_2.finaliseTransaction(wallet, mnemonic, "signTransfer", {
		amount: platform_sdk_support_1.BigNumber.make(amount).times(1e8).toString(),
		to,
		memo,
	});
};
exports.sendTransfer = sendTransfer;
//# sourceMappingURL=send-transfer.js.map
