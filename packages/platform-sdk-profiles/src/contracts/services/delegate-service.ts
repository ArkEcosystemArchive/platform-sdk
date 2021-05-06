import { Coins } from "@arkecosystem/platform-sdk";

import { IProfile } from "../profiles";
import { IReadWriteWallet } from "../wallets";
import { IReadOnlyWallet } from "../wallets/read-only-wallet";

/**
 * Defines the implementation contract for the delegate service.
 *
 * @export
 * @interface IDelegateService
 */
export interface IDelegateService {
	/**
	 * Get all delegates for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @return {IReadOnlyWallet[]}
	 * @memberof IDelegateService
	 */
	all(coin: string, network: string): IReadOnlyWallet[];

	/**
	 * Find the delegate for the given coin, network and address.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} address
	 * @return {IReadOnlyWallet}
	 * @memberof IDelegateService
	 */
	findByAddress(coin: string, network: string, address: string): IReadOnlyWallet;

	/**
	 * Find the delegate for the given coin, network and public key.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} publicKey
	 * @return {IReadOnlyWallet}
	 * @memberof IDelegateService
	 */
	findByPublicKey(coin: string, network: string, publicKey: string): IReadOnlyWallet;

	/**
	 * Find the delegate for the given coin, network and username.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} username
	 * @return {IReadOnlyWallet}
	 * @memberof IDelegateService
	 */
	findByUsername(coin: string, network: string, username: string): IReadOnlyWallet;

	/**
	 * Synchronise delegates for the given coin and network.
	 *
	 * @param {Coins.Coin} coin
	 * @return {Promise<void>}
	 * @memberof IDelegateService
	 */
	sync(coin: Coins.Coin): Promise<void>;

	/**
	 * Synchronise delegates for all coins and networks.
	 *
	 * @param {IProfile} profile
	 * @return {Promise<void>}
	 * @memberof IDelegateService
	 */
	syncAll(profile: IProfile): Promise<void>;

	/**
	 * Map the given public keys to delegates of the coin and network of the given wallet.
	 *
	 * @param {IReadWriteWallet} wallet
	 * @param {string[]} publicKeys
	 * @return {IReadOnlyWallet[]}
	 * @memberof IDelegateService
	 */
	map(wallet: IReadWriteWallet, publicKeys: string[]): IReadOnlyWallet[];
}
