import { CoinNetwork } from "./network.models";

/**
 *
 *
 * @export
 * @class NetworkRepository
 */
export class NetworkRepository {
	/**
	 *
	 *
	 * @type {Record<string, CoinNetwork>}
	 * @memberof NetworkRepository
	 */
	readonly #networks: Record<string, CoinNetwork>;

	/**
	 *Creates an instance of NetworkRepository.
	 * @param {Record<string, CoinNetwork>} networks
	 * @memberof NetworkRepository
	 */
	public constructor(networks: Record<string, CoinNetwork>) {
		this.#networks = networks;
	}

	/**
	 *
	 *
	 * @returns {Record<string, CoinNetwork>}
	 * @memberof NetworkRepository
	 */
	public all(): Record<string, CoinNetwork> {
		return this.#networks;
	}

	/**
	 *
	 *
	 * @param {string} name
	 * @returns {CoinNetwork}
	 * @memberof NetworkRepository
	 */
	public get(name: string): CoinNetwork {
		const result: CoinNetwork | undefined = this.#networks[name];

		if (!result) {
			throw new Error(`The [${name}] network is not supported.`);
		}

		return result;
	}

	/**
	 *
	 *
	 * @param {string} name
	 * @param {CoinNetwork} data
	 * @memberof NetworkRepository
	 */
	public push(name: string, data: CoinNetwork): void {
		this.#networks[name] = data;
	}

	/**
	 *
	 *
	 * @param {string} name
	 * @memberof NetworkRepository
	 */
	public forget(name: string): void {
		delete this.#networks[name];
	}
}
