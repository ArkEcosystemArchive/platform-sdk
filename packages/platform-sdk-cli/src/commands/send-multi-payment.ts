import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import prompts from "prompts";

import { renderLogo } from "../helpers";
import { finaliseTransaction } from "./helpers";

export const sendMultiPayment = async (wallet: ReadWriteWallet): Promise<void> => {
	renderLogo();

	const payments: { amount: string; to: string; }[] = [];

	let addMore = true;
	while (addMore) {
		const { amount, to, more } = await prompts([
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
				name: "more",
				message: "Do you want to add another recipient?",
				initial: true,
				active: "yes",
				inactive: "no",
			},
		]);

		payments.push({ amount, to });

		addMore = more;
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

	await finaliseTransaction(wallet, mnemonic, "signMultiPayment", {
		payments,
		memo,
	});
};
