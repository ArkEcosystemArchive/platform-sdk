import { NetworkRepository } from "../networks/network-repository";
import { Coin } from "./coin";
import { Config, ConfigKey } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";

import { Request } from "../../../platform-sdk-http-got";

export class CoinFactory {
	public static make(specification: CoinSpec, options: CoinOptions): Coin {
		const networks: NetworkRepository = new NetworkRepository(specification.manifest.networks);

		const config: Config = new Config(options, specification.schema);
		config.set(ConfigKey.Network, networks.get(config.get<string>("network")));
		config.set(ConfigKey.HttpClient, new Request());

		return new Coin({
			networks,
			manifest: new Manifest(specification.manifest),
			config,
			specification,
		});
	}
}
