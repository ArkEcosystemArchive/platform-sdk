/* istanbul ignore file */

import { IdentityOptions, PublicKeyService as Contract, PublicKeyDataTransferObject } from "../../contracts";
import { NotSupported } from "../../exceptions";

export abstract class AbstractPublicKeyService implements Contract {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PublicKeyDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<PublicKeyDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<PublicKeyDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<PublicKeyDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromSecret");
	}
}
