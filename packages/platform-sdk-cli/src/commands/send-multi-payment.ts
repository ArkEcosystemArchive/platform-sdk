import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendMultiPayment = async (wallet: ReadWriteWallet): Promise<void> => {
	renderLogo();

	// memo?: string;
	// payments: {
	// 	to: string;
	// 	amount: string;
	// }[];

	const { mnemonic, amount, to, memo } = await prompts([
		{
			type: "text",
			name: "to",
			message: "Please enter the recipient:",
			validate: (value: string) => value !== undefined,
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value: string) => BIP39.validate(value),
		},
	]);

	if (!to) {
		return;
	}

	if (!amount) {
		return;
	}

	if (!mnemonic) {
		return;
	}

	await finaliseTransaction(wallet, mnemonic, "signMultiPayment", {
		amount: BigNumber.make(amount).toSatoshi().toString(),
		to,
		memo,
	});
};
