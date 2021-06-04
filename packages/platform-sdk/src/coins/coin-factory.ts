import { Network, NetworkManifest } from "../networks";
import { NetworkRepository } from "../networks/network-repository";
import { Coin } from "./coin";
import { Config, ConfigKey } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";

export class CoinFactory {
	public static make(specification: CoinSpec, options: CoinOptions): Coin {
		const networks: NetworkRepository = new NetworkRepository(specification.manifest.networks);
		const network: Network = CoinFactory.#createNetwork(specification, networks.get(options.network));

		const config: Config = new Config(options, specification.schema);
		config.set(ConfigKey.Network, network);

		return new Coin({
			network,
			networks,
			manifest: new Manifest(specification.manifest),
			config,
			specification,
		});
	}

	static #createNetwork(specification: CoinSpec, network: NetworkManifest): Network {
		return new Network(specification.manifest, {
			...specification.manifest.networks[network.id],
			...network,
		});
	}
}
