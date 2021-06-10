import { Collections, Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class ClientService extends Services.AbstractClientService {
	#private;
	transaction(id: string, input?: Services.TransactionDetailInput): Promise<Contracts.TransactionDataType>;
	transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection>;
	wallet(id: string): Promise<Contracts.WalletData>;
	delegates(query?: Contracts.KeyValuePair): Promise<Collections.WalletDataCollection>;
	broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse>;
	private onPostConstruct;
}
