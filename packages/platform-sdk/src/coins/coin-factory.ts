import { BindingType, Container } from "../ioc";
import { Network, NetworkManifest } from "../networks";
import { NetworkRepository } from "../networks/network-repository";
import { Coin } from "./coin";
import { ConfigKey, ConfigRepository } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";

export class CoinFactory {
	public static make(specification: CoinSpec, options: CoinOptions): Coin {
		// Arrange
		const configRepository: ConfigRepository = new ConfigRepository(options, specification.schema);
		const networkRepository: NetworkRepository = new NetworkRepository(specification.manifest.networks);

		// Act
		const container = new Container();
		container.constant(BindingType.Container, container);
		container.constant(BindingType.ConfigRepository, configRepository);
		container.constant(BindingType.HttpClient, options.httpClient);
		container.constant(BindingType.Manifest, new Manifest(specification.manifest));
		container.constant(BindingType.Network, CoinFactory.#createNetwork(specification, configRepository));
		container.constant(BindingType.NetworkRepository, networkRepository);
		container.constant(BindingType.Specification, specification);

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
