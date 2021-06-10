import { AddressDataTransferObject } from "./address.contract";
import { IdentityOptions } from "./shared.contract";
import { WalletDiscoveryService } from "./wallet-discovery.contract";
export declare class AbstractWalletDiscoveryService implements WalletDiscoveryService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject[]>;
}
