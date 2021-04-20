import { IWalletExportOptions } from "../profiles/profile";
import { IReadWriteWallet, IWalletData } from "../wallets/wallet";

/**
 * Defines the implementation contract for the wallet repository.
 *
 * @export
 * @interface IWalletRepository
 */
export interface IWalletRepository {
	/**
	 * Get all keys and values.
	 *
	 * @returns {Record<string, IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	all(): Record<string, IReadWriteWallet>;

	/**
	 * Get the first wallet.
	 *
	 * @returns {IReadWriteWallet}
	 * @memberof IWalletRepository
	 */
	first(): IReadWriteWallet;

	/**
	 * Get the last wallet.
	 *
	 * @returns {IReadWriteWallet}
	 * @memberof IWalletRepository
	 */
	last(): IReadWriteWallet;

	/**
	 * Get all wallets grouped by their coin and network.
	 *
	 * @returns {Record<string, Record<string, IReadWriteWallet>>}
	 * @memberof IWalletRepository
	 */
	allByCoin(): Record<string, Record<string, IReadWriteWallet>>;

	/**
	 * Get all keys.
	 *
	 * @returns {string[]}
	 * @memberof IWalletRepository
	 */
	keys(): string[];

	/**
	 * Get all values.
	 *
	 * @returns {IReadWriteWallet[]}
	 * @memberof IWalletRepository
	 */
	values(): IReadWriteWallet[];

	/**
	 * Import a wallet from a mnemonic.
	 *
	 * @param {string} mnemonic
	 * @param {string} coin
	 * @param {string} network
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByMnemonic(mnemonic: string, coin: string, network: string): Promise<IReadWriteWallet>;

	/**
	 * Import a wallet from an address.
	 *
	 * @param {string} address
	 * @param {string} coin
	 * @param {string} network
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByAddress(address: string, coin: string, network: string): Promise<IReadWriteWallet>;

	/**
	 * Import a wallet from an address list.
	 *
	 * @param {string[]} addresses
	 * @param {string} coin
	 * @param {string} network
	 * @returns {Promise<IReadWriteWallet[]>}
	 * @memberof IWalletRepository
	 */
	importByAddressList(addresses: string[], coin: string, network: string): Promise<IReadWriteWallet[]>;

	/**
	 * Import a wallet from a BIP44 path.
	 *
	 * @param {string} address
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} path
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByAddressWithLedgerPath(
		address: string,
		coin: string,
		network: string,
		path: string,
	): Promise<IReadWriteWallet>;

	/**
	 * Import a wallet from a mnemonic with a password.
	 *
	 * @param {string} mnemonic
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} password
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByMnemonicWithEncryption(
		mnemonic: string,
		coin: string,
		network: string,
		password: string,
	): Promise<IReadWriteWallet>;

	/**
	 * Import a wallet from a public key.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} publicKey
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByPublicKey(coin: string, network: string, publicKey: string): Promise<IReadWriteWallet>;

	/**
	 * Import a wallet from a private key.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} privateKey
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByPrivateKey(coin: string, network: string, privateKey: string): Promise<IReadWriteWallet>;

	/**
	 * Import a wallet from a WIF.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} wif
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByWIF(coin: string, network: string, wif: string): Promise<IReadWriteWallet>;

	/**
	 * Import a wallet from a WIF with a password.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} wif
	 * @param {string} password
	 * @returns {Promise<IReadWriteWallet>}
	 * @memberof IWalletRepository
	 */
	importByWIFWithEncryption(
		coin: string,
		network: string,
		wif: string,
		password: string,
	): Promise<IReadWriteWallet>;

	/**
	 * Generate a new wallet for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} [locale]
	 * @returns {Promise<{ mnemonic: string; wallet: IReadWriteWallet }>}
	 * @memberof IWalletRepository
	 */
	generate(coin: string, network: string, locale?: string): Promise<{ mnemonic: string; wallet: IReadWriteWallet }>;

	/**
	 * Fill the storage with wallet data.
	 *
	 * @param {Record<string, IWalletData>} struct
	 * @returns {Promise<void>}
	 * @memberof IWalletRepository
	 */
	fill(struct: Record<string, IWalletData>): Promise<void>;

	/**
	 * Restore the wallets.
	 *
	 * @returns {Promise<void>}
	 * @memberof IWalletRepository
	 */
	restore(): Promise<void>;

	/**
	 * Find a wallet by its ID.
	 *
	 * @param {string} id
	 * @returns {IReadWriteWallet}
	 * @memberof IWalletRepository
	 */
	findById(id: string): IReadWriteWallet;

	/**
	 * Find a wallet by its address.
	 *
	 * @param {string} address
	 * @returns {(IReadWriteWallet | undefined)}
	 * @memberof IWalletRepository
	 */
	findByAddress(address: string): IReadWriteWallet | undefined;

	/**
	 * Find a wallet by its public key.
	 *
	 * @param {string} publicKey
	 * @returns {(IReadWriteWallet | undefined)}
	 * @memberof IWalletRepository
	 */
	findByPublicKey(publicKey: string): IReadWriteWallet | undefined;

	/**
	 * Find many wallets by their coins.
	 *
	 * @param {string} coin
	 * @returns {IReadWriteWallet[]}
	 * @memberof IWalletRepository
	 */
	findByCoin(coin: string): IReadWriteWallet[];

	/**
	 * Find many wallets by their coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @returns {IReadWriteWallet[]}
	 * @memberof IWalletRepository
	 */
	findByCoinWithNetwork(coin: string, network: string): IReadWriteWallet[];

	/**
	 * Find a wallet by its alias.
	 *
	 * @param {string} alias
	 * @returns {(IReadWriteWallet | undefined)}
	 * @memberof IWalletRepository
	 */
	findByAlias(alias: string): IReadWriteWallet | undefined;

	/**
	 * Update a wallet.
	 *
	 * @param {string} id
	 * @param {{ alias?: string }} data
	 * @memberof IWalletRepository
	 */
	update(id: string, data: { alias?: string }): void;

	/**
	 * Determine if the wallet exists.
	 *
	 * @param {string} id
	 * @returns {boolean}
	 * @memberof IWalletRepository
	 */
	has(id: string): boolean;

	/**
	 * Remove the wallet for the given ID.
	 *
	 * @param {string} id
	 * @memberof IWalletRepository
	 */
	forget(id: string): void;

	/**
	 * Remove all wallets.
	 *
	 * @memberof IWalletRepository
	 */
	flush(): void;

	/**
	 * Count how many wallets there are.
	 *
	 * @returns {number}
	 * @memberof IWalletRepository
	 */
	count(): number;

	/**
	 * Turn the wallets into a normalised object.
	 *
	 * @param {IWalletExportOptions} options
	 * @returns {Record<string, IWalletData>}
	 * @memberof IWalletRepository
	 */
	toObject(options: IWalletExportOptions): Record<string, IWalletData>;

	/**
	 * Get all wallets sorted by the given column.
	 *
	 * @param {string} column
	 * @param {("asc" | "desc")} direction
	 * @returns {IReadWriteWallet[]}
	 * @memberof IWalletRepository
	 */
	sortBy(column: string, direction: "asc" | "desc"): IReadWriteWallet[];
}
