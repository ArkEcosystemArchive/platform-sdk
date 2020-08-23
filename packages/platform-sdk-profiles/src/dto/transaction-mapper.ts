import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";

export const transformTransactionData = (
	coin: Coins.Coin,
	transaction: Contracts.TransactionDataType,
): Contracts.TransactionDataType => new TransactionData(coin, transaction);
