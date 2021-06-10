import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class ClientService extends Services.AbstractClientService {
	#private;
	private onPostConstruct;
	wallet(id: string): Promise<Contracts.WalletData>;
	broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse>;
}
