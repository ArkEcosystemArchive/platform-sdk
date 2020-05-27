export interface IdentityService {
	destruct(): Promise<void>;

	address(): Address;

	publicKey(): PublicKey;

	privateKey(): PrivateKey;

	wif(): WIF;

	keys(): Keys;
}

export interface KeyPair {
	publicKey: string;
	privateKey?: string;
}

export interface Address {
	fromPassphrase(passphrase: string): Promise<string>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	fromPublicKey(publicKey: string): Promise<string>;
	fromPrivateKey(privateKey: string): Promise<string>;
	fromWIF(wif: string): Promise<string>;
	validate(address: string): Promise<boolean>;
}

export interface PublicKey {
	fromPassphrase(passphrase: string): Promise<string>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	fromWIF(wif: string): Promise<string>;
}

export interface PrivateKey {
	fromPassphrase(passphrase: string): Promise<string>;
	fromWIF(wif: string): Promise<string>;
}

export interface WIF {
	fromPassphrase(passphrase: string): Promise<string>;
}

export interface Keys {
	fromPassphrase(passphrase: string): Promise<KeyPair>;
	fromWIF(wif: string): Promise<KeyPair>;
}
