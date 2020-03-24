export interface Identity {
	getAddress(opts: IdentityInput): string;

	getPublicKey(opts: IdentityInput): string;

	getPrivateKey(opts: IdentityInput): string;

	getWIF(opts: IdentityInput): string;

	getKeyPair(opts: IdentityInput): KeyPair;
}

export interface KeyPair {
	publicKey: string;
	privateKey?: string;
}

export type IdentityInput = Record<string, any>;
