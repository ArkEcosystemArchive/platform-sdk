/* istanbul ignore file */

import { IdentityOptions, WIFService as Contract, WIFDataTransferObject } from "../../contracts";
import { NotImplemented } from "../../exceptions";

export abstract class AbstractWIFService implements Contract {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<WIFDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromPrivateKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<WIFDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromPrivateKey");
	}

	public async fromSecret(secret: string): Promise<WIFDataTransferObject> {
		throw new NotImplemented(this.constructor.name, "fromSecret");
	}
}
