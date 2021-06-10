import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendIPFS = async (wallet: Contracts.IReadWriteWallet): Promise<void> => {
	renderLogo();

	const { mnemonic, hash } = await prompts([
		{
			type: "text",
			name: "hash",
			message: "Please enter the hash:",
			validate: (value: string) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value: string) => BIP39.validate(value),
		},
	]);

	if (!hash) {
		return;
	}

	if (!mnemonic) {
		return;
	}

	await finaliseTransaction(wallet, mnemonic, "signIpfs", { hash });
};
