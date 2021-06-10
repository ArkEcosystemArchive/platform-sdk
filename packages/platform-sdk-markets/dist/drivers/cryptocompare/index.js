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
var _CryptoCompare_instances, _CryptoCompare_httpClient, _CryptoCompare_host, _CryptoCompare_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoCompare = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const historical_price_transformer_1 = require("./transformers/historical-price-transformer");
const historical_volume_transformer_1 = require("./transformers/historical-volume-transformer");
const market_transformer_1 = require("./transformers/market-transformer");
/**
 * Implements a price tracker through the CryptoCompare API.
 *
 * @see https://min-api.cryptocompare.com/
 *
 * @export
 * @class PriceTracker
 * @implements {PriceTracker}
 */
class CryptoCompare {
	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	constructor(httpClient) {
		_CryptoCompare_instances.add(this);
		/**
		 * The HTTP client instance.
		 *
		 * @type {HttpClient}
		 * @memberof PriceTracker
		 */
		_CryptoCompare_httpClient.set(this, void 0);
		/**
		 * The host of the CryptoCompare API.
		 *
		 * @type {string}
		 * @memberof PriceTracker
		 */
		_CryptoCompare_host.set(this, "https://min-api.cryptocompare.com");
		__classPrivateFieldSet(this, _CryptoCompare_httpClient, httpClient, "f");
	}
	/** {@inheritDoc PriceTracker.verifyToken} */
	async verifyToken(token) {
		try {
			const body = await __classPrivateFieldGet(this, _CryptoCompare_instances, "m", _CryptoCompare_get).call(
				this,
				"data/price",
				{
					fsym: token,
					tsyms: "BTC",
				},
			);
			return !!body.BTC;
		} catch {
			return false;
		}
	}
	/** {@inheritDoc PriceTracker.marketData} */
	async marketData(token) {
		const body = await __classPrivateFieldGet(this, _CryptoCompare_instances, "m", _CryptoCompare_get).call(
			this,
			"data/pricemultifull",
			{
				fsyms: token,
				tsyms: Object.keys(platform_sdk_intl_1.CURRENCIES).join(","),
			},
		);
		return new market_transformer_1.MarketTransformer(body.RAW && body.RAW[token] ? body.RAW[token] : {}).transform(
			{},
		);
	}
	/** {@inheritDoc PriceTracker.historicalPrice} */
	async historicalPrice(options) {
		const body = await __classPrivateFieldGet(this, _CryptoCompare_instances, "m", _CryptoCompare_get).call(
			this,
			`data/histo${options.type}`,
			{
				fsym: options.token,
				tsym: options.currency,
				toTs: Math.round(new Date().getTime() / 1000),
				limit: options.days,
			},
		);
		return new historical_price_transformer_1.HistoricalPriceTransformer(body.Data).transform(options);
	}
	/** {@inheritDoc PriceTracker.historicalVolume} */
	async historicalVolume(options) {
		const body = await __classPrivateFieldGet(this, _CryptoCompare_instances, "m", _CryptoCompare_get).call(
			this,
			`data/histo${options.type}`,
			{
				fsym: options.token,
				tsym: options.currency,
				toTs: Math.round(new Date().getTime() / 1000),
				limit: options.days,
			},
		);
		return new historical_volume_transformer_1.HistoricalVolumeTransformer(body.Data).transform(options);
	}
	/** {@inheritDoc PriceTracker.dailyAverage} */
	async dailyAverage(options) {
		const response = await __classPrivateFieldGet(this, _CryptoCompare_instances, "m", _CryptoCompare_get).call(
			this,
			`data/dayAvg`,
			{
				fsym: options.token,
				tsym: options.currency,
				toTs: platform_sdk_intl_1.DateTime.make(options.timestamp).toUNIX(),
			},
		);
		return response[options.currency.toUpperCase()];
	}
}
exports.CryptoCompare = CryptoCompare;
(_CryptoCompare_httpClient = new WeakMap()),
	(_CryptoCompare_host = new WeakMap()),
	(_CryptoCompare_instances = new WeakSet()),
	(_CryptoCompare_get =
		/**
		 * Sends an HTTP GET request to the CryptoCompare API.
		 *
		 * @private
		 * @param {string} path
		 * @param {*} [query={}]
		 * @returns {Promise<any>}
		 * @memberof PriceTracker
		 */
		async function _CryptoCompare_get(path, query = {}) {
			const response = await __classPrivateFieldGet(this, _CryptoCompare_httpClient, "f").get(
				`${__classPrivateFieldGet(this, _CryptoCompare_host, "f")}/${path}`,
				query,
			);
			return response.json();
		});
//# sourceMappingURL=index.js.map
