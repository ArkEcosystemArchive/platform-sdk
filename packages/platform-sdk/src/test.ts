/* istanbul ignore file */

import { ConfigKey, ConfigRepository } from "./coins";
import { Container, BindingType } from "./ioc";
import { NetworkManifest } from "./networks";
import { BigNumberService } from "./services";

export const createService = <T = any>({
	config,
	httpClient,
	manifest,
	meta,
	predicate,
	schema,
	service,
}: {
	config?: ConfigRepository;
	httpClient: any;
	manifest: NetworkManifest;
	meta?: any;
	predicate: any;
	schema: any;
	service: any;
}): T => {
	config ??= new ConfigRepository({ network: manifest.id, httpClient }, schema);

	config.set(ConfigKey.Network, manifest);

	if (meta) {
		for (const [key, value] of Object.entries(meta)) {
			config.set(key, value);
		}
	}

	const container = new Container();
	container.constant(BindingType.ConfigRepository, config);
	container.constant(BindingType.HttpClient, httpClient);
	container.singleton(BindingType.BigNumberService, BigNumberService);

	if (predicate) {
		predicate(container);
	}

	return container.resolve(service);
};
