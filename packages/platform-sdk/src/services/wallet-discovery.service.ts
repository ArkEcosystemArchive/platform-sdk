/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { AddressDataTransferObject } from "./identity";
import { IdentityOptions } from "./identity/shared.contract";
import { WalletDiscoveryService } from "./wallet-discovery.contract";

export abstract class AbstractWalletDiscoveryService implements WalletDiscoveryService {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject[]> {
		throw new NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}
}
