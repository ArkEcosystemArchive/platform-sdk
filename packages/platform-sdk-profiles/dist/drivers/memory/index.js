"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDriver = void 0;
const container_models_1 = require("../../environment/container.models");
const data_repository_1 = require("../../repositories/data-repository");
const profile_repository_1 = require("./repositories/profile-repository");
const delegate_service_1 = require("./services/delegate-service");
const exchange_rate_service_1 = require("./services/exchange-rate-service");
const fee_service_1 = require("./services/fee-service");
const known_wallet_service_1 = require("./services/known-wallet-service");
const wallet_service_1 = require("./services/wallet-service");
const plugins_1 = require("./plugins");
const factory_1 = require("../../environment/storage/factory");
class MemoryDriver {
	/**
	 * Create all necessary container bindings based on the given options.
	 *
	 * @param {IoC.Container} container
	 * @param {EnvironmentOptions} options
	 * @memberof MemoryDriver
	 */
	make(container, options) {
		if (typeof options.storage === "string") {
			container.constant(container_models_1.Identifiers.Storage, factory_1.StorageFactory.make(options.storage));
		} else {
			container.constant(container_models_1.Identifiers.Storage, options.storage);
		}
		container.constant(container_models_1.Identifiers.HttpClient, options.httpClient);
		container.constant(container_models_1.Identifiers.Coins, options.coins);
		container.singleton(container_models_1.Identifiers.AppData, data_repository_1.DataRepository);
		container.singleton(container_models_1.Identifiers.DelegateService, delegate_service_1.DelegateService);
		container.singleton(
			container_models_1.Identifiers.ExchangeRateService,
			exchange_rate_service_1.ExchangeRateService,
		);
		container.singleton(container_models_1.Identifiers.FeeService, fee_service_1.FeeService);
		container.singleton(
			container_models_1.Identifiers.KnownWalletService,
			known_wallet_service_1.KnownWalletService,
		);
		container.singleton(container_models_1.Identifiers.PluginRegistry, plugins_1.PluginRegistry);
		container.singleton(container_models_1.Identifiers.ProfileRepository, profile_repository_1.ProfileRepository);
		container.singleton(container_models_1.Identifiers.WalletService, wallet_service_1.WalletService);
	}
}
exports.MemoryDriver = MemoryDriver;
//# sourceMappingURL=index.js.map
