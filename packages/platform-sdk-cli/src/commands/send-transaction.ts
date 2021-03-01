import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import prompts from "prompts";

import { useLogger } from "../helpers";

export const sendTransaction = async (wallet: ReadWriteWallet): Promise<void> => {
	console.clear();

	const { mnemonic, amount, to, memo } = await prompts([
		{
			type: "text",
			name: "to",
			message: "Please enter the recipient:",
		},
		{
			type: "text",
			name: "amount",
			message: "Please enter the amount:",
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
		},
	]);

	const transactionID = await wallet.transaction().signTransfer({
		from: wallet.address(),
		data: {
			amount,
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

	useLogger().info(`Transaction [${transactionID}] has been confirmed.`);
};
