/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { AddressDataTransferObject, AddressService } from "./address.contract";
import { IdentityOptions } from "./shared.contract";

@injectable()
export class AbstractAddressService implements AddressService {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}

	public async fromPublicKey(publicKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}

	public async fromPrivateKey(privateKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromPrivateKey.name);
	}

	public async fromWIF(wif: string): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromWIF.name);
	}

	public async fromSecret(secret: string): Promise<AddressDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromSecret.name);
	}

	public async validate(address: string): Promise<boolean> {
		throw new NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}
}
