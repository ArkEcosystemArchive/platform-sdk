import { WalletData } from "../../contracts";
import { Paginator } from "./paginator";

/**
 *
 *
 * @export
 * @class WalletDataCollection
 * @extends {Paginator<WalletData>}
 */
export class WalletDataCollection extends Paginator<WalletData> {
	/**
	 *
	 *
	 * @param {string} address
	 * @returns {(WalletData | undefined)}
	 * @memberof WalletDataCollection
	 */
	public findByAddress(address: string): WalletData | undefined {
		return this.find("address", address);
	}

	/**
	 *
	 *
	 * @param {string} publicKey
	 * @returns {(WalletData | undefined)}
	 * @memberof WalletDataCollection
	 */
	public findByPublicKey(publicKey: string): WalletData | undefined {
		return this.find("publicKey", publicKey);
	}

	/**
	 *
	 *
	 * @param {string} username
	 * @returns {(WalletData | undefined)}
	 * @memberof WalletDataCollection
	 */
	public findByUsername(username: string): WalletData | undefined {
		return this.find("username", username);
	}

	/**
	 *
	 *
	 * @private
	 * @param {string} key
	 * @param {string} value
	 * @returns {(WalletData | undefined)}
	 * @memberof WalletDataCollection
	 */
	private find(key: string, value: string): WalletData | undefined {
		return this.items().find((wallet: WalletData) => wallet[key]() === value);
	}
}
