import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionData } from "../../dto/transaction";
import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { transformTransactionData } from "../../dto/transaction-mapper";
import { promiseAllSettledByKey } from "../../helpers/promise";
import { ReadWriteWallet } from "../../wallets/wallet.models";
import { ProfileContract } from "../profile.models";

type HistoryMethod = string;
type HistoryWallet = ExtendedTransactionDataCollection;

type AggregateQuery = {
	addresses?: string[];
} & Contracts.ClientPagination;

export interface ITransactionAggregate {
    transactions(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
    sentTransactions(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
    receivedTransactions(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
    hasMore(method: string): boolean;
    flush(method: string): void;
}
