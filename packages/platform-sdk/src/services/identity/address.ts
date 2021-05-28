/* istanbul ignore file */

import { IdentityOptions, AddressService as Contract, AddressDataTransferObject } from "../../contracts";
import { NotSupported } from "../../exceptions";

export abstract class AbstractAddressService implements Contract {
	public async fromMnemonic(
		mnemonic: string,
		options?: IdentityOptions,
	): Promise<AddressDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<AddressDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(
		publicKey: string,
		options?: IdentityOptions,
	): Promise<AddressDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: IdentityOptions,
	): Promise<AddressDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<AddressDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<AddressDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}
}
