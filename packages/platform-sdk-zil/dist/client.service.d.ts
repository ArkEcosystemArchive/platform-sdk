import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class ClientService extends Services.AbstractClientService {
	#private;
	private onPostConstruct;
	transaction(id: string, input?: Services.TransactionDetailInput): Promise<Contracts.TransactionDataType>;
	wallet(id: string): Promise<Contracts.WalletData>;
	broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse>;
}
