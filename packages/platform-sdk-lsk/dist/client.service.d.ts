import { Collections, Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class ClientService extends Services.AbstractClientService {
	#private;
	private onPostConstruct;
	transaction(id: string, input?: Services.TransactionDetailInput): Promise<Contracts.TransactionDataType>;
	transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection>;
	wallet(id: string): Promise<Contracts.WalletData>;
	wallets(query: Services.ClientWalletsInput): Promise<Collections.WalletDataCollection>;
	delegate(id: string): Promise<Contracts.WalletData>;
	delegates(query?: any): Promise<Collections.WalletDataCollection>;
	votes(id: string): Promise<Services.VoteReport>;
	broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse>;
}
