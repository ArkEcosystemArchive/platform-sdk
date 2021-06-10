import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendMultiPayment = async (wallet: Contracts.IReadWriteWallet): Promise<void> => {
	renderLogo();

	const payments: { amount: string; to: string }[] = [];

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { amount, to, addMore } = await prompts([
			{
				type: "text",
				name: "amount",
				message: "Please enter the amount:",
				validate: (value: string) => BigNumber.make(value).isGreaterThan(0),
			},
			{
				type: "text",
				name: "to",
				message: "Please enter the recipient:",
				validate: (value: string) => value !== undefined,
			},
			{
				type: "toggle",
				name: "addMore",
				message: "Do you want to add another recipient?",
				initial: true,
				active: "yes",
				inactive: "no",
			},
		]);

		if (!to) {
			return;
		}

		if (!amount) {
			return;
		}

		payments.push({ amount, to });

		if (!addMore) {
			break;
		}
	}

	const { mnemonic, memo } = await prompts([
		{
			type: "text",
			name: "to",
			message: "Please enter the recipient:",
			validate: (value: string) => value !== undefined,
		},
		{
			type: "text",
			name: "memo",
			message: "Please enter the memo:",
		},
		{
			type: "password",
			name: "mnemonic",
			message: "Please enter your mnemonic:",
			validate: (value: string) => BIP39.validate(value),
		},
	]);

	if (!payments.length) {
		return;
	}

	if (!mnemonic) {
		return;
	}

	await finaliseTransaction(wallet, mnemonic, "signMultiPayment", {
		payments,
		memo,
	});
};
