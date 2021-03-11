/**
 *
 *
 * @export
 * @interface Peer
 */
export interface Peer {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof Peer
	 */
	ip: string;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof Peer
	 */
	port: number;
	/**
	 *
	 *
	 * @type {Record<string, number>}
	 * @memberof Peer
	 */
	ports?: Record<string, number>;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof Peer
	 */
	version?: string;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof Peer
	 */
	height?: number;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof Peer
	 */
	latency?: number;
}

export interface PeerResponse {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof PeerResponse
	 */
	ip: string;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof PeerResponse
	 */
	port: number;
	/**
	 *
	 *
	 * @type {Record<string, number>}
	 * @memberof PeerResponse
	 */
	ports: Record<string, number>;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof PeerResponse
	 */
	version: string;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof PeerResponse
	 */
	height: number;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof PeerResponse
	 */
	latency: number;
}

/**
 *
 *
 * @export
 * @interface PeerService
 */
export interface PeerService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof PeerService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof PeerService
	 */
	getSeeds(): string[];

	/**
	 *
	 *
	 * @param {*} opts
	 * @returns {Promise<PeerResponse[]>}
	 * @memberof PeerService
	 */
	search(opts: any): Promise<PeerResponse[]>;
}
