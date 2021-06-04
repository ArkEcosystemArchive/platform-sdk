import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendTransfer = async (wallet: Contracts.IReadWriteWallet): Promise<void> => {
	renderLogo();

	const { mnemonic, amount, to, memo } = await prompts([
		{
			type: "text",
			name: "to",
			message: "Please enter the recipient:",
			validate: (value: string) => value !== undefined,
		},
		{
			type: "text",
			name: "amount",
			message: "Please enter the amount:",
			validate: (value: string) => BigNumber.make(value).isGreaterThan(0),
		},
		{
			type: "text",
			name: "memo",
			message: "Please enter the memo:",
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

	await finaliseTransaction(wallet, mnemonic, "signTransfer", {
		amount: BigNumber.make(amount).times(1e8).toString(),
		to,
		memo,
	});
};
