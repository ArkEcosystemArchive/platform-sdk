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

export interface AddressInput {
	passphrase?: string;
	multiSignature?: {
		min: number,
		publicKeys: string[],
	};
	publicKey?: string;
	privateKey?: string;
	wif?: string;
}

export interface PublicKeyInput {
	passphrase?: string;
	multiSignature?: {
		min: number,
		publicKeys: string[],
	};
	wif?: string;
}

export interface PrivateKeyInput {
	passphrase?: string;
	wif?: string;
}

export interface WifInput {
	passphrase?: string;
}

export interface KeyPairInput {
	passphrase?: string;
	publicKey?: string;
	privateKey?: string;
	wif?: string;
}
