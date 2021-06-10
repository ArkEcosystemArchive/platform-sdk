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
var _CoinGecko_instances, _CoinGecko_httpClient, _CoinGecko_host, _CoinGecko_getTokenId, _CoinGecko_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinGecko = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const historical_price_transformer_1 = require("./transformers/historical-price-transformer");
const historical_volume_transformer_1 = require("./transformers/historical-volume-transformer");
const market_transformer_1 = require("./transformers/market-transformer");
/**
 * Implements a price tracker through the CoinGecko API.
 *
 * @see https://www.coingecko.com/en/api
 *
 * @export
 * @class PriceTracker
 * @implements {PriceTracker}
 */
class CoinGecko {
	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	constructor(httpClient) {
		_CoinGecko_instances.add(this);
		/**
		 * The cache that holds the remote token identifiers.
		 *
		 * @private
		 * @type {Contracts.KeyValuePair}
		 * @memberof PriceTracker
		 */
		Object.defineProperty(this, "tokenLookup", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: {},
		});
		/**
		 * The HTTP client instance.
		 *
		 * @type {HttpClient}
		 * @memberof PriceTracker
		 */
		_CoinGecko_httpClient.set(this, void 0);
		/**
		 * The host of the CoinGecko API.
		 *
		 * @type {string}
		 * @memberof PriceTracker
		 */
		_CoinGecko_host.set(this, "https://api.coingecko.com/api/v3");
		__classPrivateFieldSet(this, _CoinGecko_httpClient, httpClient, "f");
	}
	/** {@inheritDoc PriceTracker.verifyToken} */
	async verifyToken(token) {
		const tokenId = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_getTokenId).call(
			this,
			token,
		);
		try {
			const body = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_get).call(
				this,
				`simple/price`,
				{
					ids: tokenId,
					vs_currencies: "BTC",
				},
			);
			return !!body[tokenId];
		} catch {
			return false;
		}
	}
	/** {@inheritDoc PriceTracker.marketData} */
	async marketData(token) {
		const tokenId = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_getTokenId).call(
			this,
			token,
		);
		const body = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_get).call(
			this,
			`coins/${tokenId}`,
		);
		return new market_transformer_1.MarketTransformer(body.market_data).transform({});
	}
	/** {@inheritDoc PriceTracker.historicalPrice} */
	async historicalPrice(options) {
		const tokenId = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_getTokenId).call(
			this,
			options.token,
		);
		const body = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_get).call(
			this,
			`coins/${tokenId}/market_chart`,
			{
				vs_currency: options.currency,
				days: options.days,
			},
		);
		return new historical_price_transformer_1.HistoricalPriceTransformer(body).transform(options);
	}
	/** {@inheritDoc PriceTracker.historicalVolume} */
	async historicalVolume(options) {
		const tokenId = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_getTokenId).call(
			this,
			options.token,
		);
		const body = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_get).call(
			this,
			`coins/${tokenId}/market_chart/range`,
			{
				id: options.token,
				vs_currency: options.currency,
				from: platform_sdk_intl_1.DateTime.make().subDays(options.days).toUNIX(),
				to: platform_sdk_intl_1.DateTime.make().toUNIX(),
			},
		);
		return new historical_volume_transformer_1.HistoricalVolumeTransformer(body).transform(options);
	}
	/** {@inheritDoc PriceTracker.dailyAverage} */
	async dailyAverage(options) {
		var _a;
		const tokenId = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_getTokenId).call(
			this,
			options.token,
		);
		const response = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_get).call(
			this,
			`coins/${tokenId}/history`,
			{
				date: platform_sdk_intl_1.DateTime.make(options.timestamp).format("DD-MM-YYYY"),
			},
		);
		return (_a = response.market_data) === null || _a === void 0
			? void 0
			: _a.current_price[options.currency.toLowerCase()];
	}
}
exports.CoinGecko = CoinGecko;
(_CoinGecko_httpClient = new WeakMap()),
	(_CoinGecko_host = new WeakMap()),
	(_CoinGecko_instances = new WeakSet()),
	(_CoinGecko_getTokenId =
		/**
		 * Returns and/or caches the remote token identifier.
		 *
		 * @private
		 * @param {*} token
		 * @returns {Promise<string>}
		 * @memberof PriceTracker
		 */
		async function _CoinGecko_getTokenId(token) {
			if (Object.keys(this.tokenLookup).length > 0) {
				return this.tokenLookup[token.toUpperCase()];
			}
			const uri = `coins/list`;
			const body = await __classPrivateFieldGet(this, _CoinGecko_instances, "m", _CoinGecko_get).call(this, uri);
			for (const value of Object.values(body)) {
				// @ts-ignore
				this.tokenLookup[value.symbol.toUpperCase()] = value.id;
			}
			return this.tokenLookup[token.toUpperCase()];
		}),
	(_CoinGecko_get =
		/**
		 * Sends an HTTP GET request to the CoinGecko API.
		 *
		 * @private
		 * @param {string} path
		 * @param {*} [query={}]
		 * @returns {Promise<any>}
		 * @memberof PriceTracker
		 */
		async function _CoinGecko_get(path, query = {}) {
			const response = await __classPrivateFieldGet(this, _CoinGecko_httpClient, "f").get(
				`${__classPrivateFieldGet(this, _CoinGecko_host, "f")}/${path}`,
				query,
			);
			return response.json();
		});
//# sourceMappingURL=index.js.map
