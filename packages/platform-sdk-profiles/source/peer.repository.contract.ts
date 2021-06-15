import { IProfile } from "./contracts";

/**
 * Defines the structure that represents a peer.
 *
 * @export
 * @interface IPeer
 */
export interface IPeer {
	name: string;
	host: string;
	isMultiSignature: boolean;
}

/**
 * Defines the implementation contract for the peer repository.
 *
 * @export
 * @interface IPeerRepository
 */
export interface IPeerRepository {
	/**
	 * Fill the storage with peer data.
	 *
	 * @param {object} peers
	 * @memberof IPeerRepository
	 */
	fill(peers: object): void;

	/**
	 * Get all keys and values.
	 *
	 * @returns {Record<string, IPeer>}
	 * @memberof IPeerRepository
	 */
	all(): Record<string, IPeer>;

	/**
	 * Get all keys.
	 *
	 * @returns {string[]}
	 * @memberof IPeerRepository
	 */
	keys(): string[];

	/**
	 * Get all values.
	 *
	 * @returns {IProfile[]}
	 * @memberof IPeerRepository
	 */
	values(): IProfile[];

	/**
	 * Get all peers for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @returns {IPeer[]}
	 * @memberof IPeerRepository
	 */
	get(coin: string, network: string): IPeer[];

	/**
	 * Create a peer for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {IPeer} peer
	 * @memberof IPeerRepository
	 */
	create(coin: string, network: string, peer: IPeer): void;

	/**
	 * Check if the given coin and network has any peers.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @returns {boolean}
	 * @memberof IPeerRepository
	 */
	has(coin: string, network: string): boolean;

	/**
	 * Update the given peer.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {string} host
	 * @param {IPeer} peer
	 * @memberof IPeerRepository
	 */
	update(coin: string, network: string, host: string, peer: IPeer): void;

	/**
	 * Remove the peer from the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {IPeer} peer
	 * @memberof IPeerRepository
	 */
	forget(coin: string, network: string, peer: IPeer): void;

	/**
	 * Turn the storage into a normalised object.
	 *
	 * @returns {Record<string, IPeer>}
	 * @memberof IPeerRepository
	 */
	toObject(): Record<string, IPeer>;

	/**
	 * Get the relay peer for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @returns {(IPeer | undefined)}
	 * @memberof IPeerRepository
	 */
	getRelay(coin: string, network: string): IPeer | undefined;

	/**
	 * Get all relay peers for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @returns {IPeer[]}
	 * @memberof IPeerRepository
	 */
	getRelays(coin: string, network: string): IPeer[];

	/**
	 * Get the multi-signature peer for the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @returns {(IPeer | undefined)}
	 * @memberof IPeerRepository
	 */
	getMultiSignature(coin: string, network: string): IPeer | undefined;
}
