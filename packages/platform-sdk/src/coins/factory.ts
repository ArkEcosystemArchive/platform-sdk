import { Coin } from "./coin";
import { CoinOptions, CoinSpecs } from "./contracts";
import { Manifest } from "./manifest";
import { NetworkRepository } from "./network-repository";

export class CoinFactory {
	public static async make(coin: CoinSpecs, options: CoinOptions): Promise<Coin> {
		const merge = (options: CoinOptions, service: string) => ({
			network: options.network,
			peer: options.peer,
			...(options.services ? options.services[service] || {} : {}),
		});

		const { manifest, services } = coin;

		return new Coin({
			network: new NetworkRepository(manifest.networks),
			manifest: new Manifest(manifest),
			services: {
				client: await services.client.construct(merge(options, "client")),
				fee: await services.fee.construct(merge(options, "fee")),
				identity: await services.identity.construct(merge(options, "identity")),
				ledger: await services.ledger.construct(merge(options, "ledger")),
				link: await services.link.construct(merge(options, "link")),
				message: await services.message.construct(merge(options, "message")),
				peer: await services.peer.construct(merge(options, "peer")),
				transaction: await services.transaction.construct(merge(options, "transaction")),
			},
		});
	}
}
