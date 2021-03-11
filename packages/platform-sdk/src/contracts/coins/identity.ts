export interface AddressListEntry {
	/**
	 *
	 *
	 * @type {number}
	 * @memberof AddressListEntry
	 */
	index: number;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof AddressListEntry
	 */
	spendAddress: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof AddressListEntry
	 */
	changeAddress: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof AddressListEntry
	 */
	stakeAddress: string;
	/**
	 *
	 *
	 * @type {boolean}
	 * @memberof AddressListEntry
	 */
	used: boolean;
}

/**
 *
 *
 * @export
 * @interface IdentityService
 */
export interface IdentityService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof IdentityService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @returns {Address}
	 * @memberof IdentityService
	 */
	address(): Address;

	/**
	 *
	 *
	 * @returns {AddressList}
	 * @memberof IdentityService
	 */
	addressList(): AddressList;

	/**
	 *
	 *
	 * @returns {PublicKey}
	 * @memberof IdentityService
	 */
	publicKey(): PublicKey;

	/**
	 *
	 *
	 * @returns {PrivateKey}
	 * @memberof IdentityService
	 */
	privateKey(): PrivateKey;

	/**
	 *
	 *
	 * @returns {WIF}
	 * @memberof IdentityService
	 */
	wif(): WIF;

	/**
	 *
	 *
	 * @returns {Keys}
	 * @memberof IdentityService
	 */
	keys(): Keys;
}

/**
 *
 *
 * @export
 * @interface KeyPair
 */
export interface KeyPair {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof KeyPair
	 */
	publicKey: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof KeyPair
	 */
	privateKey?: string;
}

/**
 *
 *
 * @export
 * @interface IdentityOptions
 */
export interface IdentityOptions {
	bip44?: {
		/**
		 *
		 *
		 * @type {number}
		 */
		account: number;
		/**
		 *
		 *
		 * @type {number}
		 */
		change: number;
		/**
		 *
		 *
		 * @type {number}
		 */
		addressIndex: number;
	};
	/**
	 *
	 *
	 * @type {boolean}
	 * @memberof IdentityOptions
	 */
	bip49?: boolean;
	/**
	 *
	 *
	 * @type {boolean}
	 * @memberof IdentityOptions
	 */
	bip84?: boolean;
}

/**
 *
 *
 * @export
 * @interface Address
 */
export interface Address {
	/**
	 *
	 *
	 * @param {string} mnemonic
	 * @param {IdentityOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof Address
	 */
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	/**
	 *
	 *
	 * @param {number} min
	 * @param {string[]} publicKeys
	 * @returns {Promise<string>}
	 * @memberof Address
	 */
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	/**
	 *
	 *
	 * @param {string} publicKey
	 * @param {IdentityOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof Address
	 */
	fromPublicKey(publicKey: string, options?: IdentityOptions): Promise<string>;
	/**
	 *
	 *
	 * @param {string} privateKey
	 * @param {IdentityOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof Address
	 */
	fromPrivateKey(privateKey: string, options?: IdentityOptions): Promise<string>;
	/**
	 *
	 *
	 * @param {string} wif
	 * @returns {Promise<string>}
	 * @memberof Address
	 */
	fromWIF(wif: string): Promise<string>;
	/**
	 *
	 *
	 * @param {string} address
	 * @returns {Promise<boolean>}
	 * @memberof Address
	 */
	validate(address: string): Promise<boolean>;
}

/**
 *
 *
 * @export
 * @interface AddressList
 */
export interface AddressList {
	/**
	 *
	 *
	 * @param {string} mnemonic
	 * @param {number} pageSize
	 * @returns {Promise<AddressListEntry[]>}
	 * @memberof AddressList
	 */
	fromMnemonic(mnemonic: string, pageSize: number): Promise<AddressListEntry[]>;
	/**
	 *
	 *
	 * @param {string} privateKey
	 * @param {number} pageSize
	 * @returns {Promise<AddressListEntry[]>}
	 * @memberof AddressList
	 */
	fromPrivateKey(privateKey: string, pageSize: number): Promise<AddressListEntry[]>;
}

/**
 *
 *
 * @export
 * @interface PublicKey
 */
export interface PublicKey {
	/**
	 *
	 *
	 * @param {string} mnemonic
	 * @param {IdentityOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof PublicKey
	 */
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	/**
	 *
	 *
	 * @param {number} min
	 * @param {string[]} publicKeys
	 * @returns {Promise<string>}
	 * @memberof PublicKey
	 */
	fromMultiSignature(min: number, publicKeys: string[]): Promise<string>;
	/**
	 *
	 *
	 * @param {string} wif
	 * @returns {Promise<string>}
	 * @memberof PublicKey
	 */
	fromWIF(wif: string): Promise<string>;
}

/**
 *
 *
 * @export
 * @interface PrivateKey
 */
export interface PrivateKey {
	/**
	 *
	 *
	 * @param {string} mnemonic
	 * @param {IdentityOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof PrivateKey
	 */
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	/**
	 *
	 *
	 * @param {string} wif
	 * @returns {Promise<string>}
	 * @memberof PrivateKey
	 */
	fromWIF(wif: string): Promise<string>;
}

/**
 *
 *
 * @export
 * @interface WIF
 */
export interface WIF {
	/**
	 *
	 *
	 * @param {string} mnemonic
	 * @param {IdentityOptions} [options]
	 * @returns {Promise<string>}
	 * @memberof WIF
	 */
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<string>;
	/**
	 *
	 *
	 * @param {string} privateKey
	 * @returns {Promise<string>}
	 * @memberof WIF
	 */
	fromPrivateKey(privateKey: string): Promise<string>;
}

/**
 *
 *
 * @export
 * @interface Keys
 */
export interface Keys {
	/**
	 *
	 *
	 * @param {string} mnemonic
	 * @param {IdentityOptions} [options]
	 * @returns {Promise<KeyPair>}
	 * @memberof Keys
	 */
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPair>;
	/**
	 *
	 *
	 * @param {string} wif
	 * @returns {Promise<KeyPair>}
	 * @memberof Keys
	 */
	fromWIF(wif: string): Promise<KeyPair>;
}
