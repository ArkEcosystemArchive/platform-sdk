import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendDelegateResignation = async (wallet: ReadWriteWallet): Promise<void> => {
	renderLogo();

	const { mnemonic, amount, to, memo } = await prompts([
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value: string) => BIP39.validate(value),
		},
	]);

	if (!mnemonic) {
		return;
	}

	await finaliseTransaction(wallet, mnemonic, "signDelegateResignation");
};
