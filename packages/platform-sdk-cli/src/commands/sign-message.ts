import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";
import { Signatories } from "../../../platform-sdk-ark/node_modules/@arkecosystem/platform-sdk/dist";

import { renderLogo, useLogger } from "../helpers";

export const signMessage = async (wallet: Contracts.IReadWriteWallet): Promise<void> => {
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

	useLogger().info(JSON.stringify(await wallet.message().sign({
		message,
		signatory: await wallet.coin().signatory().mnemonic(mnemonic),
	})));
};
