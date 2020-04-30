import { KeyValuePair } from "../types";

export interface IdentityService {
	getAddress(opts: KeyValuePair): Promise<string>;

	getPublicKey(opts: KeyValuePair): Promise<string>;

	getPrivateKey(opts: KeyValuePair): Promise<string>;

	getWIF(opts: KeyValuePair): Promise<string>;

	getKeyPair(opts: KeyValuePair): Promise<KeyPair>;
}

export interface KeyPair {
	publicKey: string;
	privateKey?: string;
}
