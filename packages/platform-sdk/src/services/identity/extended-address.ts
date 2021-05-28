/* istanbul ignore file */

import {
	IdentityOptions,
	ExtendedAddressService as Contract,
	ExtendedAddressDataTransferObject,
} from "../../contracts";
import { NotSupported } from "../../exceptions";

export abstract class AbstractExtendedAddressService implements Contract {
	public async fromMnemonic(mnemonic: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPrivateKey(privateKey: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}
}
