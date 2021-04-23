/**
 * Defines the implementation contract for the known wallet service.
 *
 * @export
 * @interface IKnownWalletService
 */
export interface IKnownWalletService {
	/**
	 * Synchronise all known wallets from all coins and networks.
	 *
	 * @return {Promise<void>}
	 * @memberof IKnownWalletService
	 */
	syncAll(): Promise<void>;

	/**
	 * Get the human-readable name for the known wallet.
	 *
	 * @remarks
	 * This returns `undefined` if the wallet is not known.
	 *
	 * @param {string} network
	 * @param {string} address
	 * @return {(string | undefined)}
	 * @memberof IKnownWalletService
	 */
	name(network: string, address: string): string | undefined;

	/**
	 * Determine if the address is known.
	 *
	 * @param {string} network
	 * @param {string} address
	 * @return {boolean}
	 * @memberof IKnownWalletService
	 */
	is(network: string, address: string): boolean;

	/**
	 * Determine if the address is an exchange wallet.
	 *
	 * @param {string} network
	 * @param {string} address
	 * @return {boolean}
	 * @memberof IKnownWalletService
	 */
	isExchange(network: string, address: string): boolean;

	/**
	 * Determine if the address is a team wallet.
	 *
	 * @param {string} network
	 * @param {string} address
	 * @return {boolean}
	 * @memberof IKnownWalletService
	 */
	isTeam(network: string, address: string): boolean;
}
