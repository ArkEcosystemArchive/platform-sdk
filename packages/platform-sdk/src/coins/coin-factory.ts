import { Coin } from "./coin";
import { Config } from "./config";
import { CoinOptions, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";
import { NetworkRepository } from "./network-repository";

export class CoinFactory {
	public static async make(coin: CoinSpec, options: CoinOptions): Promise<Coin> {
		const { manifest, services } = coin;

		const networks: NetworkRepository = new NetworkRepository(manifest.networks);

		const config: Config = new Config(options, coin.schema);
		config.set("network", networks.get(config.get<string>("network")));

		const [client, fee, identity, ledger, link, message, multiSignature, peer, transaction] = await Promise.all([
			services.ClientService.construct(config),
			services.FeeService.construct(config),
			services.IdentityService.construct(config),
			services.LedgerService.construct(config),
			services.LinkService.construct(config),
			services.MessageService.construct(config),
			services.MultiSignatureService.construct(config),
			services.PeerService.construct(config),
			services.TransactionService.construct(config),
		])

		return new Coin({
			networks,
			manifest: new Manifest(manifest),
			config,
			services: {
				client,
				fee,
				identity,
				ledger,
				link,
				message,
				multiSignature,
				peer,
				transaction,
			},
		});
	}
}
