import { AddressDataTransferObject } from "./address.contract";

export interface WalletDiscoveryService {
	fromMnemonic(mnemonic: string): Promise<AddressDataTransferObject[]>;
}
