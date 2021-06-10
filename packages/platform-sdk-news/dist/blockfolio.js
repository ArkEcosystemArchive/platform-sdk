"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _Blockfolio_httpClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockfolio = void 0;
/**
 * Implements Blockfolio Signal retrieval from the Platform SDK API.
 *
 * @export
 * @class Blockfolio
 */
class Blockfolio {
	/**
	 * Creates an instance of Blockfolio.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof Blockfolio
	 */
	constructor(httpClient) {
		/**
		 * The HTTP client used for communication.
		 *
		 * @type {HttpClient}
		 * @memberof Blockfolio
		 */
		_Blockfolio_httpClient.set(this, void 0);
		__classPrivateFieldSet(this, _Blockfolio_httpClient, httpClient, "f");
	}
	/**
	 * Retrieves signals for a given coin.
	 *
	 * @param {{
	 * 		page?: number;
	 * 		query?: string;
	 * 		coins: string[];
	 * 		categories?: string[];
	 * 	}} query
	 * @returns {Promise<BlockfolioResponse>}
	 * @memberof Blockfolio
	 */
	async findByCoin(query) {
		const { data, meta } = (
			await __classPrivateFieldGet(this, _Blockfolio_httpClient, "f").get(
				`https://platform.ark.io/api/coins/signals`,
				query,
			)
		).json();
		return { data, meta };
	}
}
exports.Blockfolio = Blockfolio;
_Blockfolio_httpClient = new WeakMap();
//# sourceMappingURL=blockfolio.js.map
