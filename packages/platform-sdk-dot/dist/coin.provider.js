"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const wasm_crypto_1 = require("@polkadot/wasm-crypto");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
const coin_services_1 = require("./coin.services");
class ServiceProvider extends platform_sdk_1.IoC.AbstractServiceProvider {
	async make(container) {
		await wasm_crypto_1.waitReady();
		container.constant(constants_1.BindingType.ApiPromise, await helpers_1.createApiPromise(this.configRepository));
		container.constant(constants_1.BindingType.Keyring, helpers_1.createKeyring(this.configRepository));
		return this.compose(coin_services_1.Services, container);
	}
}
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=coin.provider.js.map
