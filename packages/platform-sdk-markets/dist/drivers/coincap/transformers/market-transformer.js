"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _MarketTransformer_instances, _MarketTransformer_normalise;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketTransformer = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const utils_1 = require("../utils");
/**
 * Implements a transformer for historical market data.
 *
 * @export
 * @class MarketTransformer
 * @implements {MarketTransformer}
 */
class MarketTransformer {
	/**
	 * Creates an instance of MarketTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof MarketTransformer
	 */
	constructor(data) {
		_MarketTransformer_instances.add(this);
		Object.defineProperty(this, "data", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: data,
		});
		// All prices on the CoinCap API are standardized in USD (United States Dollar)
		/**
		 *
		 *
		 * @private
		 * @type {string}
		 * @memberof MarketTransformer
		 */
		Object.defineProperty(this, "baseCurrency", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "USD",
		});
	}
	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {MarketDataCollection}
	 * @memberof MarketTransformer
	 */
	transform(options) {
		const tokenId = options.token.toUpperCase();
		const result = {};
		for (const currency of Object.keys(options.currencies || platform_sdk_intl_1.CURRENCIES)) {
			const { assets, rates } = this.data;
			if (!assets[currency]) {
				continue;
			}
			result[currency] = {
				currency,
				price: utils_1.convertToCurrency(1, {
					from: currency,
					to: tokenId,
					base: this.baseCurrency,
					rates,
				}),
				marketCap: __classPrivateFieldGet(
					this,
					_MarketTransformer_instances,
					"m",
					_MarketTransformer_normalise,
				).call(this, assets[tokenId].marketCapUsd, rates, currency),
				volume: __classPrivateFieldGet(
					this,
					_MarketTransformer_instances,
					"m",
					_MarketTransformer_normalise,
				).call(this, assets[tokenId].volumeUsd24Hr, rates, currency),
				date: new Date(this.data.timestamp),
				change24h: null,
			};
		}
		return result;
	}
}
exports.MarketTransformer = MarketTransformer;
(_MarketTransformer_instances = new WeakSet()),
	(_MarketTransformer_normalise = function _MarketTransformer_normalise(marketCapUsd, rates, currency) {
		return marketCapUsd * (rates[this.baseCurrency] / rates[currency]);
	});
//# sourceMappingURL=market-transformer.js.map
