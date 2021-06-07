/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { PrivateKeyDataTransferObject, PrivateKeyService } from "./private-key.contract";
import { IdentityOptions } from "./shared.contract";

@injectable()
export class AbstractPrivateKeyService implements PrivateKeyService {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}

	public async fromWIF(wif: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromWIF.name);
	}

	public async fromSecret(secret: string): Promise<PrivateKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, this.fromSecret.name);
	}
}
