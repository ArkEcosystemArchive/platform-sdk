import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import Table from "cli-table3";

import { renderLogo } from "../helpers";

export const listTransactions = async (wallet: ReadWriteWallet): Promise<void> => {
	renderLogo();

	const transactions = await wallet.transactions({});
	const table = new Table({ head: ["ID", "Sender", "Recipient", "Amount", "Fee"] });

	for (const transaction of transactions.items()) {
		table.push([
			transaction.id(),
			transaction.sender(),
			transaction.recipient(),
			transaction.amount().toHuman(),
			transaction.fee().toHuman(),
		]);
	}

	console.log(table.toString());
};
