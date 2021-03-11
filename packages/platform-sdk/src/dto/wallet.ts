import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Entity } from "../contracts/coins";
import { KeyValuePair } from "../contracts/types";

/**
 *
 *
 * @export
 * @abstract
 * @class AbstractWalletData
 */
export abstract class AbstractWalletData {
	/**
	 *Creates an instance of AbstractWalletData.
	 * @param {KeyValuePair} data
	 * @memberof AbstractWalletData
	 */
	public constructor(protected readonly data: KeyValuePair) {}

	/**
	 *
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof AbstractWalletData
	 */
	abstract primaryKey(): string;

	/**
	 *
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof AbstractWalletData
	 */
	abstract address(): string;

	/**
	 *
	 *
	 * @abstract
	 * @returns {(string | undefined)}
	 * @memberof AbstractWalletData
	 */
	abstract publicKey(): string | undefined;

	/**
	 *
	 *
	 * @abstract
	 * @returns {BigNumber}
	 * @memberof AbstractWalletData
	 */
	abstract balance(): BigNumber;

	/**
	 *
	 *
	 * @abstract
	 * @returns {BigNumber}
	 * @memberof AbstractWalletData
	 */
	abstract nonce(): BigNumber;

	/**
	 *
	 *
	 * @abstract
	 * @returns {(string | undefined)}
	 * @memberof AbstractWalletData
	 */
	abstract secondPublicKey(): string | undefined;

	/**
	 *
	 *
	 * @abstract
	 * @returns {(string | undefined)}
	 * @memberof AbstractWalletData
	 */
	abstract username(): string | undefined;

	/**
	 *
	 *
	 * @abstract
	 * @returns {(number | undefined)}
	 * @memberof AbstractWalletData
	 */
	abstract rank(): number | undefined;

	/**
	 *
	 *
	 * @abstract
	 * @returns {(BigNumber | undefined)}
	 * @memberof AbstractWalletData
	 */
	abstract votes(): BigNumber | undefined;

	/**
	 *
	 *
	 * @abstract
	 * @returns {Entity[]}
	 * @memberof AbstractWalletData
	 */
	abstract entities(): Entity[];

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractWalletData
	 */
	abstract isDelegate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractWalletData
	 */
	abstract isMultiSignature(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractWalletData
	 */
	abstract isSecondSignature(): boolean;

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof AbstractWalletData
	 */
	public toObject(): KeyValuePair {
		return {
			address: this.address(),
			publicKey: this.publicKey(),
			balance: this.balance(),
			nonce: this.nonce(),
			username: this.username(),
			rank: this.rank(),
			votes: this.votes(),
		};
	}

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof AbstractWalletData
	 */
	public raw(): KeyValuePair {
		return this.data;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof AbstractWalletData
	 */
	public hasPassed(): boolean {
		return Object.keys(this.data).length > 0;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof AbstractWalletData
	 */
	public hasFailed(): boolean {
		return !this.hasPassed();
	}
}
