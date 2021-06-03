/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { ExtendedAddressDataTransferObject, ExtendedAddressService } from "./extended-address.contract";

export abstract class AbstractExtendedAddressService implements ExtendedAddressService {
	public async fromMnemonic(mnemonic: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]> {
		throw new NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}

	public async fromPrivateKey(privateKey: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]> {
		throw new NotImplemented(this.constructor.name, this.fromPrivateKey.name);
	}
}
