import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { IProfile, IReadWriteWallet, ITransactionAggregate } from "../../../../contracts";
import { ExtendedTransactionDataCollection } from "../../../../dto";

import { ExtendedTransactionData } from "../../../../dto/transaction";
import { transformTransactionData } from "../../../../dto/transaction-mapper";
import { promiseAllSettledByKey } from "../../../../helpers/promise";

type HistoryMethod = string;
type HistoryWallet = ExtendedTransactionDataCollection;

type AggregateQuery = {
	addresses?: string[];
} & Contracts.ClientPagination;

export class TransactionAggregate implements ITransactionAggregate {
	//
}
