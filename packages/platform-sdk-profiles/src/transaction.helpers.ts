import { Coins } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";

export const createTransactionDataCollection = ({ meta, data }, wallet) => ({
	meta,
	data: new Coins.TransactionDataCollection(
		data.all().map((transaction) => new TransactionData(transaction, wallet)),
	),
});
