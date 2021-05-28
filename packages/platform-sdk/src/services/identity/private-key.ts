/* istanbul ignore file */

import { IdentityOptions, PrivateKeyService as Contract, PrivateKeyDataTransferObject } from "../../contracts";
import { NotImplemented } from "../../exceptions";

export abstract class AbstractPrivateKeyService implements Contract {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromSecret");
	}
}
