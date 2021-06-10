"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMultiPayment = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const sendMultiPayment = async (wallet) => {
	helpers_1.renderLogo();
	const payments = [];
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { amount, to, addMore } = await prompts_1.default([
			{
				type: "text",
				name: "amount",
				message: "Please enter the amount:",
				validate: (value) => platform_sdk_support_1.BigNumber.make(value).isGreaterThan(0),
			},
			{
				type: "text",
				name: "to",
				message: "Please enter the recipient:",
				validate: (value) => value !== undefined,
			},
			{
				type: "toggle",
				name: "addMore",
				message: "Do you want to add another recipient?",
				initial: true,
				active: "yes",
				inactive: "no",
			},
		]);
		if (!to) {
			return;
		}
		if (!amount) {
			return;
		}
		payments.push({ amount, to });
		if (!addMore) {
			break;
		}
	}
	const { mnemonic, memo } = await prompts_1.default([
		{
			type: "text",
			name: "to",
			message: "Please enter the recipient:",
			validate: (value) => value !== undefined,
		},
		{
			type: "text",
			name: "memo",
			message: "Please enter the memo:",
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!payments.length) {
		return;
	}
	if (!mnemonic) {
		return;
	}
	await helpers_2.finaliseTransaction(wallet, mnemonic, "signMultiPayment", {
		payments,
		memo,
	});
};
exports.sendMultiPayment = sendMultiPayment;
//# sourceMappingURL=send-multi-payment.js.map
