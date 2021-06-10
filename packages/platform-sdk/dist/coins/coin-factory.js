"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _a, _CoinFactory_createNetwork;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinFactory = void 0;
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
const networks_1 = require("../networks");
const network_repository_1 = require("../networks/network-repository");
const coin_1 = require("./coin");
const config_1 = require("./config");
const manifest_1 = require("./manifest");
class CoinFactory {
	static make(specification, options) {
		// Arrange
		const configRepository = new config_1.ConfigRepository(options, specification.schema);
		const networkRepository = new network_repository_1.NetworkRepository(specification.manifest.networks);
		configRepository.set(config_1.ConfigKey.Network, networkRepository.get(options.network));
		// Act
		const container = new ioc_1.Container();
		container.constant(service_provider_contract_1.BindingType.ConfigRepository, configRepository);
		container.constant(service_provider_contract_1.BindingType.Container, container);
		container.constant(
			service_provider_contract_1.BindingType.DataTransferObjects,
			specification.dataTransferObjects,
		);
		container.constant(service_provider_contract_1.BindingType.HttpClient, options.httpClient);
		container.constant(
			service_provider_contract_1.BindingType.Manifest,
			new manifest_1.Manifest(specification.manifest),
		);
		container.constant(
			service_provider_contract_1.BindingType.Network,
			__classPrivateFieldGet(CoinFactory, _a, "m", _CoinFactory_createNetwork).call(
				CoinFactory,
				specification,
				configRepository,
			),
		);
		container.constant(service_provider_contract_1.BindingType.NetworkRepository, networkRepository);
		container.constant(service_provider_contract_1.BindingType.Specification, specification);
		// @TODO: use container to resolve this and inject values
		return new coin_1.Coin(container);
	}
}
exports.CoinFactory = CoinFactory;
(_a = CoinFactory),
	(_CoinFactory_createNetwork = function _CoinFactory_createNetwork(specification, configRepository) {
		const network = configRepository.get(config_1.ConfigKey.Network);
		return new networks_1.Network(specification.manifest, {
			...specification.manifest.networks[network.id],
			...network,
		});
	});
//# sourceMappingURL=coin-factory.js.map
