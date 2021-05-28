/* istanbul ignore file */

import { IdentityOptions, WIFService as Contract, WIFDataTransferObject } from "../../contracts";
import { NotSupported } from "../../exceptions";

export abstract class AbstractWIFService implements Contract {
	public async fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<WIFDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<WIFDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromSecret(secret: string): Promise<WIFDataTransferObject> {
		throw new NotSupported(this.constructor.name, "fromSecret");
	}
}
