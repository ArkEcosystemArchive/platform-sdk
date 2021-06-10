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
var _Client_instances, _Client_client, _Client_post;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const platform_sdk_http_got_1 = require("@arkecosystem/platform-sdk-http-got");
const uuid_1 = require("uuid");
/**
 * Implements a JSON-RPC client for bitcoind.
 *
 * @export
 * @class Client
 */
class Client {
	/**
	 * Creates an instance of Client.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @param {Database} database
	 * @memberof Client
	 */
	constructor(flags) {
		_Client_instances.add(this);
		/**
		 * The HTTP client instance.
		 *
		 * @type {Request}
		 * @memberof Client
		 */
		_Client_client.set(this, void 0);
		__classPrivateFieldSet(this, _Client_client, new platform_sdk_http_got_1.Request().baseUrl(flags.host), "f");
	}
	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	async height() {
		return __classPrivateFieldGet(this, _Client_instances, "m", _Client_post).call(this, "getblockcount", []);
	}
	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	async blockWithTransactions(id) {
		return __classPrivateFieldGet(this, _Client_instances, "m", _Client_post).call(this, "getblockbyheight", [
			id,
			true,
			true,
		]);
	}
}
exports.Client = Client;
(_Client_client = new WeakMap()),
	(_Client_instances = new WeakSet()),
	(_Client_post =
		/**
		 * Sends a HTTP POST request to the bitcoind JSON-RPC.
		 *
		 * @private
		 * @template T
		 * @param {string} method
		 * @param {*} params
		 * @returns {Promise<T>}
		 * @memberof Client
		 */
		async function _Client_post(method, params) {
			const response = await __classPrivateFieldGet(this, _Client_client, "f").retry(5).post("/", {
				jsonrpc: "1.0",
				id: uuid_1.v4(),
				method,
				params,
			});
			return response.json().result;
		});
//# sourceMappingURL=client.js.map
