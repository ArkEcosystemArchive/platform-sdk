import { Contracts } from "@arkecosystem/platform-sdk";

import { ReadWriteWallet } from "../wallets/wallet.models";
import { TransactionData } from "./transaction";

export const transformTransactionData = (
	wallet: ReadWriteWallet,
	transaction: Contracts.TransactionDataType,
): Contracts.TransactionDataType => new TransactionData(wallet, transaction);
