import { Contracts } from "@arkecosystem/platform-sdk-profiles";
import terminalLink from "terminal-link";

import { useLogger } from "../helpers";

export const finaliseTransaction = async (
	wallet: Contracts.IReadWriteWallet,
	mnemonic: string,
	method: string,
	data = {},
): Promise<void> => {
	const transactionID = await wallet.transaction()[method]({
		from: wallet.address(),
		data,
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
