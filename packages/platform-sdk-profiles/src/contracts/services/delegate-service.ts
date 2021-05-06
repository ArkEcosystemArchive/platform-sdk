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
	 * @param {Coins.Coin} coin
	 * @return {IReadOnlyWallet[]}
	 * @memberof IDelegateService
	 */
	all(coin: Coins.Coin): IReadOnlyWallet[];

	/**
	 * Find the delegate for the given coin, network and address.
	 *
	 * @param {Coins.Coin} coin
	 * @param {string} address
	 * @return {IReadOnlyWallet}
	 * @memberof IDelegateService
	 */
	findByAddress(coin: Coins.Coin, address: string): IReadOnlyWallet;

	/**
	 * Find the delegate for the given coin, network and public key.
	 *
	 * @param {Coins.Coin} coin
	 * @param {string} publicKey
	 * @return {IReadOnlyWallet}
	 * @memberof IDelegateService
	 */
	findByPublicKey(coin: Coins.Coin, publicKey: string): IReadOnlyWallet;

	/**
	 * Find the delegate for the given coin, network and username.
	 *
	 * @param {Coins.Coin} coin
	 * @param {string} username
	 * @return {IReadOnlyWallet}
	 * @memberof IDelegateService
	 */
	findByUsername(coin: Coins.Coin, username: string): IReadOnlyWallet;

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
