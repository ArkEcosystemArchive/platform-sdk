import { Services } from "@arkecosystem/platform-sdk";
export declare class WalletDiscoveryService implements Services.AbstractWalletDiscoveryService {
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject[]>;
}
