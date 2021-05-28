/* istanbul ignore file */

import { AddressDataTransferObject, IdentityOptions, WalletDiscoveryService as Contract } from "../contracts";
import { NotImplemented } from "../exceptions";

export abstract class AbstractWalletDiscoveryService implements Contract {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject[]> {
		throw new NotImplemented(this.constructor.name, "fromMnemonic");
	}
}
