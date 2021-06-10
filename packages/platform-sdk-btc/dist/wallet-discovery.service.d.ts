import { Coins, Services } from "@arkecosystem/platform-sdk";
import { AddressFactory } from "./address.factory";
export declare class WalletDiscoveryService extends Services.AbstractWalletDiscoveryService {
	protected readonly configRepository: Coins.ConfigRepository;
	protected readonly addressFactory: AddressFactory;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject[]>;
}
