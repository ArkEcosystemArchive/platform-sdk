import { KeyValuePair } from "../types";

export interface IdentityService {
	address(opts: KeyValuePair): Promise<string>;

	publicKey(opts: KeyValuePair): Promise<string>;

	privateKey(opts: KeyValuePair): Promise<string>;

	wif(opts: KeyValuePair): Promise<string>;

	keyPair(opts: KeyValuePair): Promise<KeyPair>;
}

export interface KeyPair {
	publicKey: string;
	privateKey?: string;
}
