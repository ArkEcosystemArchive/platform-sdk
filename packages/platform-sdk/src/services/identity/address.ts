/* istanbul ignore file */

import { IdentityOptions, AddressService as Contract, AddressDataTransferObject } from "../../contracts";
import { NotImplemented } from "../../exceptions";

export abstract class AbstractAddressService implements Contract {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromPrivateKey(privateKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}
}
