import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendVote = async (wallet: Contracts.IReadWriteWallet): Promise<void> => {
	renderLogo();

	const { mnemonic, publicKey } = await prompts([
		{
			type: "text",
			name: "publicKey",
			message: "Please enter the public key:",
			validate: (value: string) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value: string) => BIP39.validate(value),
		},
	]);

	if (!publicKey) {
		return;
	}

	if (!mnemonic) {
		return;
	}

	await finaliseTransaction(wallet, mnemonic, "signVote", {
		votes: [publicKey],
	});
};
