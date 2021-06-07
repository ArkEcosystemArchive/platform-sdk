/* istanbul ignore file */

import { ConfigKey, ConfigRepository } from "./coins";
import { Container, BindingType } from "./ioc";
import { NetworkManifest } from "./networks";
import { BigNumberService } from "./services";

const createContainer = ({
	config,
	httpClient,
	manifest,
	meta,
	schema,
}: {
	config?: ConfigRepository;
	httpClient: any;
	manifest: NetworkManifest;
	meta?: any;
	schema: any;
}): Container => {
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

	return container;
};

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

export const createServiceAsync = async <T = any>({
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
}): Promise<T> => {
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
