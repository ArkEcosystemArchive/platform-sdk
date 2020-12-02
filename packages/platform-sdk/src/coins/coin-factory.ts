import { Coin } from "./coin";
import { Config } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";
import { NetworkRepository } from "./network-repository";

export class CoinFactory {
	public static async make(coin: CoinSpec, options: CoinOptions): Promise<Coin> {
		const networks: NetworkRepository = new NetworkRepository(coin.manifest.networks);

		const config: Config = new Config(options, coin.schema);
		config.set("network", networks.get(config.get<string>("network")));

		return new Coin({
			networks,
			manifest: new Manifest(coin.manifest),
			config,
			services: await coin.ServiceProvider.make(coin, config),
		});
	}
}
