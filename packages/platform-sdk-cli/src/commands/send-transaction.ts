import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import prompts from "prompts";
import terminalLink from "terminal-link";

import { renderLogo, useLogger } from "../helpers";

export const sendTransaction = async (wallet: ReadWriteWallet): Promise<void> => {
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

	const transactionID = await wallet.transaction().signTransfer({
		from: wallet.address(),
		data: {
			amount: BigNumber.make(amount).toSatoshi().toString(),
			to,
			memo,
		},
		sign: {
			mnemonic,
		},
	});

	await wallet.transaction().broadcast(transactionID);

	useLogger().info(`Transaction [${transactionID}] has been broadcasted.`);

	let awaitingConfirmation = true;

	useLogger().info(`Transaction [${transactionID}] is awaiting confirmation.`);

	while (awaitingConfirmation) {
		try {
			awaitingConfirmation = await wallet.transaction().confirm(transactionID);
		} catch {
			awaitingConfirmation = false;
		}
	}

	const transaction = wallet.transaction().transaction(transactionID);
	const transactionLink = terminalLink("here", wallet.link().transaction(transaction.id()));

	useLogger().info(`Transaction [${transaction.id()}] has been confirmed. Click ${transactionLink} to view it.`);
};
