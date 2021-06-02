/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { KeyPairDataTransferObject, KeyPairService } from "./key-pair.contract";
import { IdentityOptions } from "./shared.contract";

export abstract class AbstractKeyPairService implements KeyPairService {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}

	public async fromPrivateKey(privateKey: string): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromPrivateKey.name);
	}

	public async fromWIF(wif: string): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromWIF.name);
	}

	public async fromSecret(secret: string): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromSecret.name);
	}
}
