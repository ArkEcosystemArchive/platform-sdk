import { KeyValuePair } from "../contracts/types";

/**
 *
 *
 * @export
 * @abstract
 * @class AbstractPeerData
 */
export abstract class AbstractPeerData {
	/**
	 *Creates an instance of AbstractPeerData.
	 * @param {KeyValuePair} data
	 * @memberof AbstractPeerData
	 */
	public constructor(protected readonly data: KeyValuePair) {}

	/**
	 *
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof AbstractPeerData
	 */
	abstract ip(): string;

	/**
	 *
	 *
	 * @abstract
	 * @returns {number}
	 * @memberof AbstractPeerData
	 */
	abstract port(): number;

	/**
	 *
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof AbstractPeerData
	 */
	abstract version(): string;

	/**
	 *
	 *
	 * @abstract
	 * @returns {number}
	 * @memberof AbstractPeerData
	 */
	abstract height(): number;

	/**
	 *
	 *
	 * @abstract
	 * @returns {number}
	 * @memberof AbstractPeerData
	 */
	abstract latency(): number;

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof AbstractPeerData
	 */
	public toObject(): KeyValuePair {
		return {
			ip: this.ip(),
			port: this.port(),
			version: this.version(),
			height: this.height(),
			latency: this.latency(),
		};
	}

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof AbstractPeerData
	 */
	public raw(): KeyValuePair {
		return this.data;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof AbstractPeerData
	 */
	public hasPassed(): boolean {
		return Object.keys(this.data).length > 0;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof AbstractPeerData
	 */
	public hasFailed(): boolean {
		return !this.hasPassed();
	}
}
