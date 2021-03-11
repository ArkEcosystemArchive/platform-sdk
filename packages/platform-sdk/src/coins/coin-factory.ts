import { Coin } from "./coin";
import { Config, ConfigKey } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";
import { NetworkRepository } from "./network-repository";

/**
 *
 *
 * @export
 * @class CoinFactory
 */
export class CoinFactory {
	/**
	 *
	 *
	 * @static
	 * @param {CoinSpec} coin
	 * @param {CoinOptions} options
	 * @returns {Promise<Coin>}
	 * @memberof CoinFactory
	 */
	public static async make(coin: CoinSpec, options: CoinOptions): Promise<Coin> {
		const networks: NetworkRepository = new NetworkRepository(coin.manifest.networks);

		const config: Config = new Config(options, coin.schema);
		config.set(ConfigKey.Network, networks.get(config.get<string>("network")));

		return new Coin({
			networks,
			manifest: new Manifest(coin.manifest),
			config,
			services: await coin.ServiceProvider.make(coin, config),
		});
	}
}
