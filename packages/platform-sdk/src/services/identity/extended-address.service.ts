/* istanbul ignore file */

import {
	ExtendedAddressService,
	ExtendedAddressDataTransferObject,
} from "./extended-address.contract";
import { NotImplemented } from "../../exceptions";
import { IdentityOptions } from "./shared.contract";

export abstract class AbstractExtendedAddressService implements ExtendedAddressService {
	public async fromMnemonic(mnemonic: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromPrivateKey(privateKey: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}
}
