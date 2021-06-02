/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { KeyPairDataTransferObject, KeyPairService } from "./key-pair.contract";
import { IdentityOptions } from "./shared.contract";

export abstract class AbstractKeyPairService implements KeyPairService {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromPrivateKey(privateKey: string): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<KeyPairDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromSecret");
	}
}
