import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { renderLogo, useLogger } from "../helpers";

export const signMessage = async (wallet: ReadWriteWallet): Promise<void> => {
	renderLogo();

	const { mnemonic, message } = await prompts([
		{
			type: "text",
			name: "message",
			message: "Please enter the message:",
			validate: (value: string) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value: string) => BIP39.validate(value),
		},
	]);

	if (!message) {
		return;
	}

	if (!mnemonic) {
		return;
	}

	useLogger().info(JSON.stringify(await wallet.message().sign({ message, mnemonic })));
};
