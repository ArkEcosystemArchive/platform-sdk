"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../helpers");
const createWallet = async (profile) => {
	helpers_1.renderLogo();
	const { command, asset } = await prompts_1.default([
		{
			type: "select",
			name: "command",
			message: "Please choose an action:",
			choices: [
				{ title: "Import by address", value: "address" },
				{ title: "Import by mnemonic", value: "mnemonic" },
				{ title: "Exit", value: "exit" },
			],
			initial: 0,
		},
		{
			type: "select",
			name: "asset",
			message: "Please choose an asset:",
			choices: [
				{ title: "ARK (Development)", value: ["ARK", "ark.devnet"] },
				{ title: "AVAX (Development)", value: ["AVAX", "avax.testnet"] },
				{ title: "DOT (Development)", value: ["DOT", "dot.testnet"] },
				{ title: "EGLD (Development)", value: ["EGLD", "egld.testnet"] },
				{ title: "LSK (Development)", value: ["LSK", "lsk.testnet"] },
				// { title: "SOL (Development)", value: ["SOL", "sol.testnet"] },
				{ title: "Exit", value: "exit" },
			],
			initial: 0,
		},
	]);
	if (command === "exit") {
		return;
	}
	if (command === "address") {
		const { address } = await prompts_1.default({
			type: "text",
			name: "address",
			message: "Please enter your address:",
			validate: (value) => value !== undefined,
		});
		profile.wallets().push(
			await profile.walletFactory().fromAddress({
				coin: asset[0],
				network: asset[1],
				address,
			}),
		);
	}
	if (command === "mnemonic") {
		const { mnemonic } = await prompts_1.default({
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value) => platform_sdk_crypto_1.BIP39.validate(value),
		});
		if (!mnemonic) {
			return;
		}
		profile.wallets().push(
			await profile.walletFactory().fromMnemonicWithBIP39({
				mnemonic,
				coin: asset[0],
				network: asset[1],
			}),
		);
	}
};
exports.createWallet = createWallet;
//# sourceMappingURL=create-wallet.js.map
