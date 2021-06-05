import { Request } from "../../../platform-sdk-http-got";
import { NetworkRepository } from "../networks/network-repository";
import { Coin } from "./coin";
import { Config, ConfigKey } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";

export class CoinFactory {
	public static make(specification: CoinSpec, options: CoinOptions): Coin {
		// @TODO: initialise the container here instead of inside the code

		// @TODO: bind this to the container
		const networks: NetworkRepository = new NetworkRepository(specification.manifest.networks);

		// @TODO: bind this to the container
		const config: Config = new Config(options, specification.schema);
		// @TODO: bind this to the container
		config.set(ConfigKey.Network, networks.get(config.get<string>("network")));
		// @TODO: bind this to the container
		config.set(ConfigKey.HttpClient, new Request());

		return new Coin({
			networks,
			manifest: new Manifest(specification.manifest),
			config,
			specification,
		});
	}
}
