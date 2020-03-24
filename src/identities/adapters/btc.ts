import { NotImplemented } from "../../exceptions";
import { Identity, IdentityInput, KeyPair } from "../contracts";

export class Bitcoin implements Identity {
	public constructor(network: string) {
		//
	}

	public getAddress(opts: IdentityInput): string {
		throw new NotImplemented(this.constructor.name, "getAddress");
	}

	public getPublicKey(opts: IdentityInput): string {
		throw new NotImplemented(this.constructor.name, "getPublicKey");
	}

	public getPrivateKey(opts: IdentityInput): string {
		throw new NotImplemented(this.constructor.name, "getPrivateKey");
	}

	public getWIF(opts: IdentityInput): string {
		throw new NotImplemented(this.constructor.name, "getWIF");
	}

	public getKeyPair(opts: IdentityInput): KeyPair {
		throw new NotImplemented(this.constructor.name, "getKeyPair");
	}
}
