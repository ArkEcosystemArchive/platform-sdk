/* istanbul ignore file */

import { IdentityOptions, KeyPairService as Contract, KeyPairDataTransferObject } from "../../contracts";
import { NotSupported } from "../../exceptions";

export abstract class AbstractKeyPairService implements Contract {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPairDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPrivateKey(privateKey: string): Promise<KeyPairDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<KeyPairDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<KeyPairDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromSecret");
	}
}
