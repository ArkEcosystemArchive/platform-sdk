export interface IWalletImportFormat {
	/**
	 * Get the WIF.
	 *
	 * @param {string} password
	 * @return {Promise<string>}
	 * @memberof IReadWriteWallet
	 */
	get(password: string): Promise<string>;

	/**
	 * Set the WIF.
	 *
	 * @param {string} mnemonic
	 * @param {string} password
	 * @return {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	set(mnemonic: string, password: string): Promise<void>;

	/**
	 * Determine if the wallet uses a WIF.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	exists(): boolean;
}
