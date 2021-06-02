import { AddressDataTransferObject } from "./identity/address";

export interface WalletDiscoveryService {
	fromMnemonic(mnemonic: string): Promise<AddressDataTransferObject[]>;
}
