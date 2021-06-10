import { Services } from "@arkecosystem/platform-sdk";
import { ExtendedTransactionData } from "../../../../dto/transaction";
import { IReadWriteWallet } from "../../../../contracts";
import { ExtendedTransactionDataCollection } from "../../../../dto";
import { ITransactionIndex } from "../../../../contracts/wallets/services/transaction-index";
export declare class TransactionIndex implements ITransactionIndex {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc ITransactionIndex.all} */
	all(query?: Services.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	/** {@inheritDoc ITransactionIndex.sent} */
	sent(query?: Services.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	/** {@inheritDoc ITransactionIndex.received} */
	received(query?: Services.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	/** {@inheritDoc ITransactionIndex.findById} */
	findById(id: string): Promise<ExtendedTransactionData>;
	/** {@inheritDoc ITransactionIndex.findByIds} */
	findByIds(ids: string[]): Promise<ExtendedTransactionData[]>;
}
