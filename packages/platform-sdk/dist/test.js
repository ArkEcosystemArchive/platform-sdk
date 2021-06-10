"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceAsync = exports.createService = void 0;
const coins_1 = require("./coins");
const ioc_1 = require("./ioc");
const services_1 = require("./services");
const createContainer = ({ config, httpClient, manifest, meta, schema }) => {
	config !== null && config !== void 0
		? config
		: (config = new coins_1.ConfigRepository({ network: manifest.id, httpClient }, schema));
	config.set(coins_1.ConfigKey.Network, manifest);
	if (meta) {
		for (const [key, value] of Object.entries(meta)) {
			config.set(key, value);
		}
	}
	const container = new ioc_1.Container();
	container.constant(ioc_1.BindingType.ConfigRepository, config);
	container.constant(ioc_1.BindingType.HttpClient, httpClient);
	container.singleton(ioc_1.BindingType.BigNumberService, services_1.BigNumberService);
	return container;
};
const createService = ({ config, httpClient, manifest, meta, predicate, schema, service }) => {
	const container = createContainer({
		config,
		httpClient,
		manifest,
		meta,
		schema,
	});
	if (predicate) {
		predicate(container);
	}
	return container.resolve(service);
};
exports.createService = createService;
const createServiceAsync = async ({ config, httpClient, manifest, meta, predicate, schema, service }) => {
	const container = createContainer({
		config,
		httpClient,
		manifest,
		meta,
		schema,
	});
	if (predicate) {
		await predicate(container);
	}
	return container.resolve(service);
};
exports.createServiceAsync = createServiceAsync;
//# sourceMappingURL=test.js.map
