export interface AddressListEntry {
	index: number;
	spendAddress: string;
	changeAddress: string;
	stakeAddress: string;
	used: boolean;
}

export interface IdentityService {
	__destruct(): Promise<void>;

	address(): Address;

	addressList(): AddressList;

	publicKey(): PublicKey;

	privateKey(): PrivateKey;

	wif(): WIF;

	keys(): Keys;
}

export interface KeyPair {
	publicKey: string;
	privateKey?: string;
}

export interface IdentityOptions {
	bip39?: boolean;
	bip44?: {
		account: number;
		change?: number;
		addressIndex?: number;
	};
	bip49?: {
		account: number;
		change?: number;
		addressIndex?: number;
	};
	bip84?: {
		account: number;
		change?: number;
		addressIndex?: number;
	};
}

export interface Address {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	fromPublicKey(publicKey: string, options?: IdentityOptions): Promise<string>;
	fromPrivateKey(privateKey: string, options?: IdentityOptions): Promise<string>;
	fromWIF(wif: string): Promise<string>;
	fromSecret(secret: string): Promise<string>;
	validate(address: string): Promise<boolean>;
}

export interface AddressList {
	fromMnemonic(mnemonic: string, pageSize: number): Promise<AddressListEntry[]>;
	fromPrivateKey(privateKey: string, pageSize: number): Promise<AddressListEntry[]>;
}

export interface PublicKey {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	fromWIF(wif: string): Promise<string>;
	fromSecret(secret: string): Promise<string>;
}

export interface PrivateKey {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	fromWIF(wif: string): Promise<string>;
	fromSecret(secret: string): Promise<string>;
}

export interface WIF {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	fromPrivateKey(privateKey: string): Promise<string>;
}

export interface Keys {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPair>;
	fromPrivateKey(privateKey: string): Promise<KeyPair>;
	fromWIF(wif: string): Promise<KeyPair>;
	fromSecret(secret: string): Promise<KeyPair>;
}
