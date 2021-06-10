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
var _Client_instances, _Client_client, _Client_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const platform_sdk_http_got_1 = require("@arkecosystem/platform-sdk-http-got");
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
		__classPrivateFieldSet(
			this,
			_Client_client,
			new platform_sdk_http_got_1.Request().baseUrl(flags.host).withHeaders({
				"X-Blockfolio-ApiKey": flags.key,
			}),
			"f",
		);
	}
	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	async teams(symbol) {
		return (await __classPrivateFieldGet(this, _Client_instances, "m", _Client_get).call(this, "teams", { symbol }))
			.results;
	}
	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	async signals(team, query) {
		return __classPrivateFieldGet(this, _Client_instances, "m", _Client_get).call(
			this,
			`teams/${team}/signals`,
			query,
		);
	}
}
exports.Client = Client;
(_Client_client = new WeakMap()),
	(_Client_instances = new WeakSet()),
	(_Client_get =
		/**
		 * Sends a HTTP GET request to the source server.
		 *
		 * @private
		 * @template T
		 * @param {string} method
		 * @param {*} params
		 * @returns {Promise<T>}
		 * @memberof Client
		 */
		async function _Client_get(path, query) {
			return (await __classPrivateFieldGet(this, _Client_client, "f").get(path, query)).json();
		});
//# sourceMappingURL=client.js.map
