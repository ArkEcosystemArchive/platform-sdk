import { KeyValuePair } from "../../types";

export interface Identity {
	getAddress(opts: KeyValuePair): string;

	getPublicKey(opts: KeyValuePair): string;

	getPrivateKey(opts: KeyValuePair): string;

	getWIF(opts: KeyValuePair): string;

	getKeyPair(opts: KeyValuePair): KeyPair;
}

export interface KeyPair {
	publicKey: string;
	privateKey?: string;
}
