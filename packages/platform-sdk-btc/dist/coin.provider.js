"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const constants_1 = require("./constants");
const coin_services_1 = require("./coin.services");
const address_factory_1 = require("./address.factory");
class ServiceProvider extends platform_sdk_1.IoC.AbstractServiceProvider {
	async make(container) {
		container.singleton(constants_1.BindingType.AddressFactory, address_factory_1.AddressFactory);
		return this.compose(coin_services_1.Services, container);
	}
}
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=coin.provider.js.map
