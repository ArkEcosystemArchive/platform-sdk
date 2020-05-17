import { Coin } from "./coin";
import { Config } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";
import { NetworkRepository } from "./network-repository";

export class CoinFactory {
	public static async make(coin: CoinSpec, options: CoinOptions): Promise<Coin> {
		const { manifest, services } = coin;

		const config: Config = new Config(options, coin.schema);

		return new Coin({
			network: new NetworkRepository(manifest.networks),
			manifest: new Manifest(manifest),
			config,
			services: {
				client: await services.client.construct(config),
				fee: await services.fee.construct(config),
				identity: await services.identity.construct(config),
				ledger: await services.ledger.construct(config),
				link: await services.link.construct(config),
				message: await services.message.construct(config),
				peer: await services.peer.construct(config),
				transaction: await services.transaction.construct(config),
			},
		});
	}
}
