import { Collections, Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class ClientService extends Services.AbstractClientService {
	#private;
	static readonly MONTH_IN_SECONDS: number;
	private onPostConstruct;
	transaction(id: string, input?: Services.TransactionDetailInput): Promise<Contracts.TransactionDataType>;
	transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection>;
	wallet(id: string): Promise<Contracts.WalletData>;
	broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse>;
}
