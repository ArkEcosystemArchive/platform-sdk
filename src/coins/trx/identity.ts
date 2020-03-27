import { NotImplemented } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Identity, KeyPair } from "../contracts/identity";

export class Tron implements Identity {
	public constructor(network: string) {
		//
	}

	public getAddress(opts: KeyValuePair): string {
		throw new NotImplemented(this.constructor.name, "getAddress");
	}

	public getPublicKey(opts: KeyValuePair): string {
		throw new NotImplemented(this.constructor.name, "getPublicKey");
	}

	public getPrivateKey(opts: KeyValuePair): string {
		throw new NotImplemented(this.constructor.name, "getPrivateKey");
	}

	public getWIF(opts: KeyValuePair): string {
		throw new NotImplemented(this.constructor.name, "getWIF");
	}

	public getKeyPair(opts: KeyValuePair): KeyPair {
		throw new NotImplemented(this.constructor.name, "getKeyPair");
	}
}
