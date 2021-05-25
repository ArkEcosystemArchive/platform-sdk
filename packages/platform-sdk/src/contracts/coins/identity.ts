export interface AddressDataTransferObject {
	address: string;
	path: string;
}

export interface PublicKeyDataTransferObject {
	publicKey: string;
	path: string;
}

export interface PrivateKeyDataTransferObject {
	privateKey: string;
	path: string;
}

export interface WIFDataTransferObject {
	wif: string;
	path: string;
}

export interface KeyPairDataTransferObject {
	publicKey: string;
	privateKey?: string;
	path: string;
}

export interface AddressListEntry {
	index: number;
	spendAddress: string;
	changeAddress: string;
	stakeAddress: string;
	used: boolean;
}

export interface IdentityService {
	__destruct(): Promise<void>;

	address(): AddressService;

	addressList(): AddressListService;

	publicKey(): PublicKeyService;

	privateKey(): PrivateKeyService;

	wif(): WIFService;

	keys(): KeyPairService;
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

export interface AddressService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<AddressDataTransferObject>;
	fromPublicKey(publicKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromWIF(wif: string): Promise<AddressDataTransferObject>;
	fromSecret(secret: string): Promise<AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}

export interface AddressListService {
	fromMnemonic(mnemonic: string, pageSize: number): Promise<AddressListEntry[]>;
	fromPrivateKey(privateKey: string, pageSize: number): Promise<AddressListEntry[]>;
}

export interface PublicKeyService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PublicKeyDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<PublicKeyDataTransferObject>;
	fromWIF(wif: string): Promise<PublicKeyDataTransferObject>;
	fromSecret(secret: string): Promise<string>;
}

export interface PrivateKeyService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PrivateKeyDataTransferObject>;
	fromWIF(wif: string): Promise<PrivateKeyDataTransferObject>;
	fromSecret(secret: string): Promise<PrivateKeyDataTransferObject>;
}

export interface WIFService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<WIFDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<WIFDataTransferObject>;
	fromSecret(secret: string): Promise<WIFDataTransferObject>;
}

export interface KeyPairService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPairDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<KeyPairDataTransferObject>;
	fromWIF(wif: string): Promise<KeyPairDataTransferObject>;
	fromSecret(secret: string): Promise<KeyPairDataTransferObject>;
}
