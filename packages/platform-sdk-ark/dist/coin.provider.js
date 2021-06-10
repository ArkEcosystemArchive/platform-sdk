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
var _ServiceProvider_instances, _ServiceProvider_retrieveNetworkConfiguration;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const crypto_1 = require("@arkecosystem/crypto");
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const coin_contract_1 = require("./coin.contract");
const coin_services_1 = require("./coin.services");
let ServiceProvider = class ServiceProvider extends platform_sdk_1.IoC.AbstractServiceProvider {
	constructor() {
		super(...arguments);
		_ServiceProvider_instances.add(this);
	}
	async make(container) {
		await __classPrivateFieldGet(
			this,
			_ServiceProvider_instances,
			"m",
			_ServiceProvider_retrieveNetworkConfiguration,
		).call(this, container);
		return this.compose(coin_services_1.Services, container);
	}
};
(_ServiceProvider_instances = new WeakSet()),
	(_ServiceProvider_retrieveNetworkConfiguration = async function _ServiceProvider_retrieveNetworkConfiguration(
		container,
	) {
		const http = container.get(platform_sdk_1.IoC.BindingType.HttpClient);
		let peer = platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository);
		const [crypto, status] = await Promise.all([
			http.get(`${peer}/node/configuration/crypto`),
			http.get(`${peer}/node/syncing`),
		]);
		const dataCrypto = crypto.json().data;
		const dataStatus = status.json().data;
		if (
			dataCrypto.network.client.token !== this.configRepository.get(platform_sdk_1.Coins.ConfigKey.CurrencyTicker)
		) {
			throw new Error(`Failed to connect to ${peer} because it is on another network.`);
		}
		crypto_1.Managers.configManager.setConfig(dataCrypto);
		crypto_1.Managers.configManager.setHeight(dataStatus.height);
		if (container.missing(coin_contract_1.Bindings.Crypto)) {
			container.constant(coin_contract_1.Bindings.Crypto, dataCrypto);
		}
		if (container.missing(coin_contract_1.Bindings.Height)) {
			container.constant(coin_contract_1.Bindings.Height, dataStatus.height);
		}
	});
ServiceProvider = __decorate([platform_sdk_1.IoC.injectable()], ServiceProvider);
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=coin.provider.js.map
