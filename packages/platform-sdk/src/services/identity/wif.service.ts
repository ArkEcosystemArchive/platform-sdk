/* istanbul ignore file */

import { WIFService, WIFDataTransferObject } from "./wif.contract";
import { NotImplemented } from "../../exceptions";
import { IdentityOptions } from "./shared.contract";

export abstract class AbstractWIFService implements WIFService {
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
