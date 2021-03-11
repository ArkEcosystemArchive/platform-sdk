import { get } from "dot-prop";

import { CoinNetwork } from "./network.models";

/**
 *
 *
 * @export
 * @class Network
 */
export class Network {
	/**
	 * Specifications about the network.
	 *
	 * @memberof Network
	 */
	/**
	 *
	 *
	 * @type {string}
	 * @memberof Network
	 */
	readonly #coin: string;

	/**
	 * List of feature flags that are supported.
	 *
	 * @memberof Network
	 */
	/**
	 *
	 *
	 * @type {CoinNetwork}
	 * @memberof Network
	 */
	readonly #network: CoinNetwork;

	/**
	 * Create a new Network instance.
	 *
	 * @param coin
	 * @param network
	 */
	/**
	 *Creates an instance of Network.
	 * @param {string} coin
	 * @param {CoinNetwork} network
	 * @memberof Network
	 */
	public constructor(coin: string, network: CoinNetwork) {
		this.#coin = coin;
		this.#network = network;
	}

	/**
	 * Get the coin of the network.
	 */
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Network
	 */
	public coin(): string {
		return this.#coin;
	}

	/**
	 * Get the ID of the network.
	 */
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Network
	 */
	public id(): string {
		return this.#network.id;
	}

	/**
	 * Get the name of the network.
	 */
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Network
	 */
	public name(): string {
		return this.#network.name;
	}

	/**
	 * Get the explorer URL of the coin that is used.
	 */
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Network
	 */
	public explorer(): string {
		return this.#network.explorer;
	}

	/**
	 * Get the ticker of the coin that is used.
	 */
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Network
	 */
	public ticker(): string {
		return this.#network.currency.ticker;
	}

	/**
	 * Get the symbol of the coin that is used.
	 */
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Network
	 */
	public symbol(): string {
		return this.#network.currency.symbol;
	}

	/**
	 * Determine if this is a production network.
	 */
	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Network
	 */
	public isLive(): boolean {
		return this.#network.type === "live";
	}

	/**
	 * Determine if this is a development network.
	 */
	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Network
	 */
	public isTest(): boolean {
		return this.#network.type === "test";
	}

	/**
	 * Determine if voting is supported on this network.
	 */
	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Network
	 */
	public allowsVoting(): boolean {
		return this.#network.governance?.voting?.enabled || false;
	}

	/**
	 * Get the number of delegates that forge blocks.
	 */
	/**
	 *
	 *
	 * @returns {number}
	 * @memberof Network
	 */
	public delegateCount(): number {
		return this.#network.governance?.voting?.delegateCount || 0;
	}

	/**
	 * Get the maximum number of votes per wallet.
	 */
	/**
	 *
	 *
	 * @returns {number}
	 * @memberof Network
	 */
	public maximumVotesPerWallet(): number {
		return this.#network.governance?.voting?.maximumPerWallet || 0;
	}

	/**
	 * Get the maximum number of votes per transaction.
	 */
	/**
	 *
	 *
	 * @returns {number}
	 * @memberof Network
	 */
	public maximumVotesPerTransaction(): number {
		return this.#network.governance?.voting?.maximumPerTransaction || 0;
	}

	/**
	 * Determine if the given feature is enabled.
	 *
	 * @param feature
	 */
	/**
	 *
	 *
	 * @param {string} feature
	 * @returns {boolean}
	 * @memberof Network
	 */
	public can(feature: string): boolean {
		return get(this.#network.featureFlags, feature) === true;
	}

	/**
	 * Determine if the given feature is disabled.
	 *
	 * @param feature
	 */
	/**
	 *
	 *
	 * @param {string} feature
	 * @returns {boolean}
	 * @memberof Network
	 */
	public cannot(feature: string): boolean {
		return !this.can(feature);
	}

	/**
	 * Determine if the given feature is enabled and throw an exception if it isn't.
	 *
	 * This method should be used to safe guard sections of code from executing if a feature flag isn't enabled.
	 *
	 * @param feature
	 */
	/**
	 *
	 *
	 * @param {string} feature
	 * @memberof Network
	 */
	public accessible(feature: string): void {
		if (this.cannot(feature)) {
			throw new Error(`The [${feature}] feature flag is not accessible.`);
		}
	}

	/**
	 * Return the object representation of the network.
	 */
	/**
	 *
	 *
	 * @returns {CoinNetwork}
	 * @memberof Network
	 */
	public toObject(): CoinNetwork {
		return this.#network;
	}

	/**
	 * Return the JSON representation of the network.
	 */
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Network
	 */
	public toJson(): string {
		return JSON.stringify(this.toObject());
	}
}
