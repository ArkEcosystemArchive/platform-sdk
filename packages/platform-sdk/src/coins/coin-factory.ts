import { NetworkRepository } from "../networks/network-repository";
import { Coin } from "./coin";
import { ConfigRepository, ConfigKey } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";
import { Container, ServiceKeys } from "../ioc";
import { Network, NetworkManifest } from "../networks";

export class CoinFactory {
	public static make(specification: CoinSpec, options: CoinOptions): Coin {
		// Arrange
		const config: ConfigRepository = new ConfigRepository(options, specification.schema);
		const networks: NetworkRepository = new NetworkRepository(specification.manifest.networks);

		// Act
		const container = new Container();
		container.constant(ServiceKeys.ConfigRepository, config);
		container.constant(ServiceKeys.HttpClient, options.httpClient);
		container.constant(ServiceKeys.Manifest, new Manifest(specification.manifest));
		container.constant(ServiceKeys.Network, CoinFactory.#createNetwork(specification, config));
		container.constant(ServiceKeys.NetworkRepository, networks);
		container.constant(ServiceKeys.Specification, specification);

		// @TODO: use container to resolve this and inject values
		return new Coin(container);
	}

	static #createNetwork(specification: CoinSpec, config: ConfigRepository): Network {
		const network: NetworkManifest = config.get<NetworkManifest>(ConfigKey.Network);

		return new Network(specification.manifest, {
			...specification.manifest.networks[network.id],
			...network,
		});
	}
}
