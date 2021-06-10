"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const coin_services_1 = require("./coin.services");
class ServiceProvider extends platform_sdk_1.IoC.AbstractServiceProvider {
	async make(container) {
		return this.compose(coin_services_1.Services, container);
	}
}
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=coin.provider.js.map
