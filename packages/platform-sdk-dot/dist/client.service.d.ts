import { Contracts, Services } from "@arkecosystem/platform-sdk";
import { ApiPromise } from "@polkadot/api";
export declare class ClientService extends Services.AbstractClientService {
	protected readonly client: ApiPromise;
	__destruct(): Promise<void>;
	wallet(id: string): Promise<Contracts.WalletData>;
	broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse>;
}
