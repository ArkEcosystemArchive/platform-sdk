"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendIPFS = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
const sendIPFS = async (wallet) => {
	helpers_1.renderLogo();
	const { mnemonic, hash } = await prompts_1.default([
		{
			type: "text",
			name: "hash",
			message: "Please enter the hash:",
			validate: (value) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		},
	]);
	if (!hash) {
		return;
	}
	if (!mnemonic) {
		return;
	}
	await helpers_2.finaliseTransaction(wallet, mnemonic, "signIpfs", { hash });
};
exports.sendIPFS = sendIPFS;
//# sourceMappingURL=send-ipfs.js.map
