import { Contracts, Services } from "@arkecosystem/platform-sdk";
export interface IDelegateSyncer {
	sync(): Promise<Contracts.WalletData[]>;
}
export declare class ParallelDelegateSyncer implements IDelegateSyncer {
	#private;
	constructor(clientService: Services.ClientService);
	sync(): Promise<Contracts.WalletData[]>;
}
export declare class SerialDelegateSyncer implements IDelegateSyncer {
	#private;
	constructor(client: Services.ClientService);
	sync(): Promise<Contracts.WalletData[]>;
}
