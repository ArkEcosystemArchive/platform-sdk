/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { PrivateKeyDataTransferObject, PrivateKeyService } from "./private-key.contract";
import { IdentityOptions } from "./shared.contract";

export abstract class AbstractPrivateKeyService implements PrivateKeyService {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}

	public async fromWIF(wif: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromWIF.name);
	}

	public async fromSecret(secret: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromSecret.name);
	}
}
