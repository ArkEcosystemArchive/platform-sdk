import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendDelegateRegistration = async (wallet: Contracts.IReadWriteWallet): Promise<void> => {
	renderLogo();

	const { mnemonic, username } = await prompts([
		{
			type: "text",
			name: "username",
			message: "Please enter the username:",
			validate: (value: string) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value: string) => BIP39.validate(value),
		},
	]);

	if (!username) {
		return;
	}

	if (!mnemonic) {
		return;
	}

	await finaliseTransaction(wallet, mnemonic, "signDelegateRegistration", { username });
};
