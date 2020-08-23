import { Contracts } from "@arkecosystem/platform-sdk";

import { Wallet } from "../wallets/wallet";
import { TransactionData } from "./transaction";

export const transformTransactionData = (
	wallet: Wallet,
	transaction: Contracts.TransactionDataType,
): Contracts.TransactionDataType => new TransactionData(wallet, transaction);
