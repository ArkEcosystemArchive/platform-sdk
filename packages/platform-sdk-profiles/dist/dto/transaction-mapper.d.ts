import { Collections, Contracts } from "@arkecosystem/platform-sdk";
import { IReadWriteWallet } from "../contracts";
import { ExtendedTransactionData } from "./transaction";
import { ExtendedTransactionDataCollection } from "./transaction-collection";
export declare const transformTransactionData: (
	wallet: IReadWriteWallet,
	transaction: Contracts.TransactionDataType,
) => ExtendedTransactionData;
export declare const transformTransactionDataCollection: (
	wallet: IReadWriteWallet,
	transactions: Collections.TransactionDataCollection,
) => ExtendedTransactionDataCollection;
