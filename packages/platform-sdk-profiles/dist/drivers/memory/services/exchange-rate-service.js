"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _ExchangeRateService_instances,
	_ExchangeRateService_storageKey,
	_ExchangeRateService_dataRepository,
	_ExchangeRateService_rateByDate,
	_ExchangeRateService_hasFetchedHistoricalRates,
	_ExchangeRateService_fetchDailyRate;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateService = void 0;
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const platform_sdk_markets_1 = require("@arkecosystem/platform-sdk-markets");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const data_repository_1 = require("../../../repositories/data-repository");
const container_1 = require("../../../environment/container");
const container_models_1 = require("../../../environment/container.models");
const contracts_1 = require("../../../contracts");
const inversify_1 = require("inversify");
let ExchangeRateService = class ExchangeRateService {
	constructor() {
		_ExchangeRateService_instances.add(this);
		_ExchangeRateService_storageKey.set(this, "EXCHANGE_RATE_SERVICE");
		_ExchangeRateService_dataRepository.set(this, new data_repository_1.DataRepository());
	}
	/** {@inheritDoc IExchangeRateService.syncAll} */
	async syncAll(profile, currency) {
		const wallets = profile
			.wallets()
			.values()
			.filter((wallet) => wallet.currency() === currency && wallet.network().isLive());
		if (wallets.length === 0) {
			return;
		}
		const exchangeCurrency = profile.settings().get(contracts_1.ProfileSetting.ExchangeCurrency);
		await __classPrivateFieldGet(
			this,
			_ExchangeRateService_instances,
			"m",
			_ExchangeRateService_fetchDailyRate,
		).call(this, profile, currency, exchangeCurrency);
		if (
			__classPrivateFieldGet(
				this,
				_ExchangeRateService_instances,
				"m",
				_ExchangeRateService_hasFetchedHistoricalRates,
			).call(this, currency, exchangeCurrency)
		) {
			return;
		}
		const historicalRates = await platform_sdk_markets_1.MarketService.make(
			profile.settings().get(contracts_1.ProfileSetting.MarketProvider),
			container_1.container.get(container_models_1.Identifiers.HttpClient),
		).historicalPrice({
			token: currency,
			currency: exchangeCurrency,
			days: 2000,
			type: "day",
			dateFormat: "YYYY-MM-DD",
		});
		for (let i = 0; i < historicalRates.labels.length; i++) {
			__classPrivateFieldGet(this, _ExchangeRateService_dataRepository, "f").set(
				`${currency}.${exchangeCurrency}.${historicalRates.labels[i]}`,
				historicalRates.datasets[i],
			);
		}
		await this.snapshot();
	}
	/** {@inheritDoc IExchangeRateService.exchange} */
	exchange(currency, exchangeCurrency, date, value) {
		const exchangeRate = __classPrivateFieldGet(
			this,
			_ExchangeRateService_instances,
			"m",
			_ExchangeRateService_rateByDate,
		).call(this, currency, exchangeCurrency, date);
		if (exchangeRate.isZero()) {
			return exchangeRate;
		}
		return value.times(exchangeRate);
	}
	/** {@inheritDoc IExchangeRateService.generate} */
	async snapshot() {
		await container_1.container
			.get(container_models_1.Identifiers.Storage)
			.set(
				__classPrivateFieldGet(this, _ExchangeRateService_storageKey, "f"),
				__classPrivateFieldGet(this, _ExchangeRateService_dataRepository, "f").all(),
			);
	}
	/** {@inheritDoc IExchangeRateService.generate} */
	async restore() {
		const entries = await container_1.container
			.get(container_models_1.Identifiers.Storage)
			.get(__classPrivateFieldGet(this, _ExchangeRateService_storageKey, "f"));
		if (entries !== undefined && entries !== null) {
			__classPrivateFieldGet(this, _ExchangeRateService_dataRepository, "f").fill(entries);
		}
	}
};
(_ExchangeRateService_storageKey = new WeakMap()),
	(_ExchangeRateService_dataRepository = new WeakMap()),
	(_ExchangeRateService_instances = new WeakSet()),
	(_ExchangeRateService_rateByDate = function _ExchangeRateService_rateByDate(currency, exchangeCurrency, date) {
		const result = __classPrivateFieldGet(this, _ExchangeRateService_dataRepository, "f").get(
			`${currency}.${exchangeCurrency}.${date.format("YYYY-MM-DD")}`,
		);
		if (result === undefined) {
			return platform_sdk_support_1.BigNumber.ZERO;
		}
		return platform_sdk_support_1.BigNumber.make(result);
	}),
	(_ExchangeRateService_hasFetchedHistoricalRates = function _ExchangeRateService_hasFetchedHistoricalRates(
		currency,
		exchangeCurrency,
	) {
		/* istanbul ignore next */
		return (
			Object.keys(
				__classPrivateFieldGet(this, _ExchangeRateService_dataRepository, "f").get(
					`${currency}.${exchangeCurrency}`,
				) || {},
			).length > 1
		);
	}),
	(_ExchangeRateService_fetchDailyRate = async function _ExchangeRateService_fetchDailyRate(
		profile,
		currency,
		exchangeCurrency,
	) {
		__classPrivateFieldGet(this, _ExchangeRateService_dataRepository, "f").set(
			`${currency}.${exchangeCurrency}.${platform_sdk_intl_1.DateTime.make().format("YYYY-MM-DD")}`,
			await platform_sdk_markets_1.MarketService.make(
				profile.settings().get(contracts_1.ProfileSetting.MarketProvider),
				container_1.container.get(container_models_1.Identifiers.HttpClient),
			).dailyAverage(currency, exchangeCurrency, +Date.now()),
		);
	});
ExchangeRateService = __decorate([inversify_1.injectable()], ExchangeRateService);
exports.ExchangeRateService = ExchangeRateService;
//# sourceMappingURL=exchange-rate-service.js.map
