"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVote = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const sendVote = async (wallet) => {
	helpers_1.renderLogo();
	const { mnemonic, publicKey } = await prompts_1.default([
		{
			type: "text",
			name: "publicKey",
			message: "Please enter the public key:",
			validate: (value) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!publicKey) {
		return;
	}
	if (!mnemonic) {
		return;
	}
	await helpers_2.finaliseTransaction(wallet, mnemonic, "signVote", {
		votes: [publicKey],
	});
};
exports.sendVote = sendVote;
//# sourceMappingURL=send-vote.js.map
