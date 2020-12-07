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
	fromMnemonic(mnemonic: string): Promise<string>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	fromPublicKey(publicKey: string): Promise<string>;
	fromPrivateKey(privateKey: string): Promise<string>;
	fromWIF(wif: string): Promise<string>;
	validate(address: string): Promise<boolean>;
}

export interface PublicKey {
	fromMnemonic(mnemonic: string): Promise<string>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	fromWIF(wif: string): Promise<string>;
}

export interface PrivateKey {
	fromMnemonic(mnemonic: string): Promise<string>;
	fromWIF(wif: string): Promise<string>;
}

export interface WIF {
	fromMnemonic(mnemonic: string): Promise<string>;
	fromPrivateKey(privateKey: string): Promise<string>;
}

export interface Keys {
	fromMnemonic(mnemonic: string): Promise<KeyPair>;
	fromWIF(wif: string): Promise<KeyPair>;
}
