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
var _MarketService_adapter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketService = void 0;
const coincap_1 = require("./drivers/coincap");
const coingecko_1 = require("./drivers/coingecko");
const cryptocompare_1 = require("./drivers/cryptocompare");
/**
 * Normalises the communication with Market Data Providers.
 *
 * @export
 * @class MarketService
 */
class MarketService {
	/**
	 * Creates an instance of MarketService.
	 *
	 * @param {PriceTracker} adapter
	 * @memberof MarketService
	 */
	constructor(adapter) {
		/**
		 * The adapter that is used to retrieve data.
		 *
		 * @type {PriceTracker}
		 * @memberof MarketService
		 */
		_MarketService_adapter.set(this, void 0);
		__classPrivateFieldSet(this, _MarketService_adapter, adapter, "f");
	}
	/**
	 * Creates an instance of MarketService.
	 *
	 * @static
	 * @param {string} name
	 * @param {HttpClient} httpClient
	 * @returns {MarketService}
	 * @memberof MarketService
	 */
	static make(name, httpClient) {
		return new MarketService(
			{
				coincap: new coincap_1.CoinCap(httpClient),
				coingecko: new coingecko_1.CoinGecko(httpClient),
				cryptocompare: new cryptocompare_1.CryptoCompare(httpClient),
			}[name.toLowerCase()],
		);
	}
	/**
	 * Set the adapter that is used to retrieve data.
	 *
	 * @param {PriceTracker} adapter
	 * @memberof MarketService
	 */
	setAdapter(adapter) {
		__classPrivateFieldSet(this, _MarketService_adapter, adapter, "f");
	}
	/**
	 * Verify that the given token exists on the market data provider.
	 *
	 * @param {string} token
	 * @returns {Promise<boolean>}
	 * @memberof MarketService
	 */
	async verifyToken(token) {
		return __classPrivateFieldGet(this, _MarketService_adapter, "f").verifyToken(token);
	}
	/**
	 * Returns market data for the given token.
	 *
	 * @param {string} token
	 * @returns {Promise<MarketDataCollection>}
	 * @memberof MarketService
	 */
	async marketData(token) {
		return __classPrivateFieldGet(this, _MarketService_adapter, "f").marketData(token);
	}
	/**
	 * Returns historical prices based on the given options.
	 *
	 * @param {HistoricalPriceOptions} options
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalPrice(options) {
		return __classPrivateFieldGet(this, _MarketService_adapter, "f").historicalPrice(options);
	}
	/**
	 * Returns historical prices with a daily interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalPriceForDay(token, currency) {
		return this.historicalPrice({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}
	/**
	 * Returns historical prices with a weekly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalPriceForWeek(token, currency) {
		return this.historicalPrice({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}
	/**
	 * Returns historical prices with a monthly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalPriceForMonth(token, currency) {
		return this.historicalPrice({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}
	/**
	 * Returns historical prices with a quarterly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalPriceForQuarter(token, currency) {
		return this.historicalPrice({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}
	/**
	 * Returns historical prices with a yearly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalPriceForYear(token, currency) {
		return this.historicalPrice({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}
	/**
	 * Returns historical volumes based on the given options.
	 *
	 * @param {HistoricalVolumeOptions} options
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalVolume(options) {
		return __classPrivateFieldGet(this, _MarketService_adapter, "f").historicalVolume(options);
	}
	/**
	 * Returns historical volumes with a daily interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalVolumeForDay(token, currency) {
		return this.historicalVolume({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}
	/**
	 * Returns historical volumes with a weekly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalVolumeForWeek(token, currency) {
		return this.historicalVolume({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}
	/**
	 * Returns historical volumes with a monthly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalVolumeForMonth(token, currency) {
		return this.historicalVolume({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}
	/**
	 * Returns historical volumes with a quarterly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalVolumeForQuarter(token, currency) {
		return this.historicalVolume({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}
	/**
	 * Returns historical volumes with a yearly interval.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @returns {Promise<HistoricalData>}
	 * @memberof MarketService
	 */
	async historicalVolumeForYear(token, currency) {
		return this.historicalVolume({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}
	/**
	 * Returns the daily average price for the given token, currency and time.
	 *
	 * @param {string} token
	 * @param {string} currency
	 * @param {number} timestamp
	 * @returns {Promise<number>}
	 * @memberof MarketService
	 */
	async dailyAverage(token, currency, timestamp) {
		return __classPrivateFieldGet(this, _MarketService_adapter, "f").dailyAverage({ token, currency, timestamp });
	}
}
exports.MarketService = MarketService;
_MarketService_adapter = new WeakMap();
//# sourceMappingURL=index.js.map
