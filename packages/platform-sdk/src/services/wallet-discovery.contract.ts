import { AddressDataTransferObject } from "./identity/address.contract";

export interface WalletDiscoveryService {
	fromMnemonic(mnemonic: string): Promise<AddressDataTransferObject[]>;
}
