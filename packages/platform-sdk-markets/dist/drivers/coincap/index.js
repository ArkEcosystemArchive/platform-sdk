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
var _CoinCap_instances,
	_CoinCap_httpClient,
	_CoinCap_host,
	_CoinCap_getTokenId,
	_CoinCap_fetchTokenData,
	_CoinCap_getCurrencyData,
	_CoinCap_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinCap = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const historical_price_transformer_1 = require("./transformers/historical-price-transformer");
const market_transformer_1 = require("./transformers/market-transformer");
/**
 * Implements a price tracker through the CoinCap API.
 *
 * @see https://docs.coincap.io/
 *
 * @export
 * @class PriceTracker
 * @implements {PriceTracker}
 */
class CoinCap {
	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	constructor(httpClient) {
		_CoinCap_instances.add(this);
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
		_CoinCap_httpClient.set(this, void 0);
		/**
		 * The host of the CoinCap API.
		 *
		 * @type {string}
		 * @memberof PriceTracker
		 */
		_CoinCap_host.set(this, "https://api.coincap.io/v2");
		__classPrivateFieldSet(this, _CoinCap_httpClient, httpClient, "f");
	}
	/** {@inheritDoc PriceTracker.verifyToken} */
	async verifyToken(token) {
		try {
			const tokenData = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_fetchTokenData).call(
				this,
				token,
			);
			return !!tokenData.id;
		} catch {
			return false;
		}
	}
	/** {@inheritDoc PriceTracker.marketData} */
	async marketData(token) {
		const tokenId = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_getTokenId).call(
			this,
			token,
		);
		if (!tokenId) {
			throw new Error("Failed to determine the token.");
		}
		const response = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_getCurrencyData).call(
			this,
			token,
		);
		return new market_transformer_1.MarketTransformer(response).transform({ token: tokenId });
	}
	/** {@inheritDoc PriceTracker.historicalPrice} */
	async historicalPrice(options) {
		const tokenId = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_getTokenId).call(
			this,
			options.token,
		);
		const { rates } = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_getCurrencyData).call(
			this,
			options.token,
		);
		const daysSubtract = options.days === 24 ? 1 : options.days;
		const timeInterval = options.days === 24 ? "h1" : "h12";
		const startDate = platform_sdk_intl_1.DateTime.make().subDays(daysSubtract).valueOf();
		const endDate = platform_sdk_intl_1.DateTime.make().valueOf();
		const body = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_get).call(
			this,
			`assets/${tokenId}/history`,
			{
				interval: timeInterval,
				start: startDate,
				end: endDate,
			},
		);
		return new historical_price_transformer_1.HistoricalPriceTransformer(body.data).transform({
			token: tokenId,
			currency: options.currency,
			rates,
			dateFormat: options.dateFormat,
		});
	}
	/** {@inheritDoc PriceTracker.historicalVolume} */
	async historicalVolume(options) {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.historicalVolume.name);
	}
	/** {@inheritDoc PriceTracker.dailyAverage} */
	async dailyAverage(options) {
		const tokenId = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_getTokenId).call(
			this,
			options.token,
		);
		const start = platform_sdk_intl_1.DateTime.make(options.timestamp).startOf("day").valueOf();
		const end = platform_sdk_intl_1.DateTime.make(start).addDay().valueOf();
		const response = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_get).call(
			this,
			`assets/${tokenId}/history`,
			{
				interval: "h1",
				start,
				end,
			},
		);
		if (!response.data.length) {
			return 0;
		}
		const priceUsd = response.data.reduce((acc, data) => acc + Number(data.priceUsd), 0) / response.data.length;
		const { data } = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_get).call(this, "rates");
		return priceUsd * Number(data.find((rate) => rate.symbol === options.currency.toUpperCase()).rateUsd);
	}
}
exports.CoinCap = CoinCap;
(_CoinCap_httpClient = new WeakMap()),
	(_CoinCap_host = new WeakMap()),
	(_CoinCap_instances = new WeakSet()),
	(_CoinCap_getTokenId =
		/**
		 * Returns and/or caches the remote token identifier.
		 *
		 * @private
		 * @param {string} token
		 * @param {number} [limit=1000]
		 * @returns {Promise<string>}
		 * @memberof PriceTracker
		 */
		async function _CoinCap_getTokenId(token, limit = 1000) {
			if (Object.keys(this.tokenLookup).length > 0) {
				return this.tokenLookup[token.toUpperCase()];
			}
			const body = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_get).call(
				this,
				"assets",
				{ limit },
			);
			for (const value of Object.values(body.data)) {
				// @ts-ignore
				this.tokenLookup[value.symbol.toUpperCase()] = value.id;
			}
			return this.tokenLookup[token.toUpperCase()];
		}),
	(_CoinCap_fetchTokenData =
		/**
		 * Returns information about the given token.
		 *
		 * @private
		 * @param {string} token
		 * @returns {Promise<Contracts.KeyValuePair>}
		 * @memberof PriceTracker
		 */
		async function _CoinCap_fetchTokenData(token) {
			const tokenId = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_getTokenId).call(
				this,
				token,
			);
			const body = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_get).call(
				this,
				`assets/${tokenId}`,
			);
			return body.data;
		}),
	(_CoinCap_getCurrencyData =
		/**
		 * Returns information about the available rates for the given token.
		 *
		 * @private
		 * @param {string} token
		 * @returns {Promise<Contracts.KeyValuePair>}
		 * @memberof PriceTracker
		 */
		async function _CoinCap_getCurrencyData(token) {
			const body = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_get).call(this, "rates");
			const { data, timestamp } = body;
			const tokenData = await __classPrivateFieldGet(this, _CoinCap_instances, "m", _CoinCap_fetchTokenData).call(
				this,
				token,
			);
			const response = {
				assets: { [tokenData.symbol.toUpperCase()]: tokenData },
				rates: { [tokenData.symbol.toUpperCase()]: tokenData.priceUsd },
				timestamp,
			};
			for (const value of data) {
				response.assets[value.symbol.toUpperCase()] = value;
				response.rates[value.symbol.toUpperCase()] = value.rateUsd;
			}
			return response;
		}),
	(_CoinCap_get =
		/**
		 * Sends an HTTP GET request to the CoinCap API.
		 *
		 * @private
		 * @param {string} path
		 * @param {*} [query={}]
		 * @returns {Promise<any>}
		 * @memberof PriceTracker
		 */
		async function _CoinCap_get(path, query = {}) {
			const response = await __classPrivateFieldGet(this, _CoinCap_httpClient, "f").get(
				`${__classPrivateFieldGet(this, _CoinCap_host, "f")}/${path}`,
				query,
			);
			return response.json();
		});
//# sourceMappingURL=index.js.map
