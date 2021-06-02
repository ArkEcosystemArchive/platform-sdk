/* istanbul ignore file */

import { PublicKeyService, PublicKeyDataTransferObject } from "./public-key.contract";
import { NotImplemented } from "../../exceptions";
import { IdentityOptions } from "./shared.contract";

export abstract class AbstractPublicKeyService implements PublicKeyService {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PublicKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<PublicKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<PublicKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<PublicKeyDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromSecret");
	}
}
