/* istanbul ignore file */

import { IdentityOptions, PrivateKeyService as Contract, PrivateKeyDataTransferObject } from "../../contracts";
import { NotSupported } from "../../exceptions";

export abstract class AbstractPrivateKeyService implements Contract {
	public async fromMnemonic(
		mnemonic: string,
		options?: IdentityOptions,
	): Promise<PrivateKeyDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromSecret");
	}
}
