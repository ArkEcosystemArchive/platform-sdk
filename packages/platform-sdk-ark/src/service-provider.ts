import { Managers } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import isUrl from "is-url-superb";

import { ClientService } from "./services/client";
import { FeeService } from "./services/fee";
import { IdentityService } from "./services/identity";
import { LedgerService } from "./services/ledger";
import { LinkService } from "./services/link";
import { MessageService } from "./services/message";
import { MultiSignatureService } from "./services/multi-signature";
import { PeerService } from "./services/peer";
import { TransactionService } from "./services/transaction";

export class ServiceProvider {
	public static async make(coin: Coins.CoinSpec, config: Coins.Config): Promise<Coins.CoinServices> {
		config.set("networkConfiguration", await ServiceProvider.retrieveNetworkConfiguration(config));

		const multiSignature = await MultiSignatureService.construct(config);

		const [client, fee, identity, ledger, link, message, peer, transaction] = await Promise.all([
			ClientService.construct(config),
			FeeService.construct(config),
			IdentityService.construct(config),
			LedgerService.construct(config),
			LinkService.construct(config),
			MessageService.construct(config),
			ServiceProvider.makePeerService(config),
			TransactionService.construct(config),
		]);

		return {
			client,
			fee,
			identity,
			ledger,
			link,
			message,
			multiSignature,
			peer,
			transaction,
		};
	}

	private static async retrieveNetworkConfiguration(config: Coins.Config): Promise<{ crypto; peer; status }> {
		const http: Contracts.HttpClient = config.get<Contracts.HttpClient>("httpClient");

		let peer: string;
		try {
			peer = config.get<string>("peer");
		} catch {
			peer = `${Arr.randomElement(config.get<string[]>("network.networking.hosts"))}/api`;
		}

		const [crypto, status]: any = await Promise.all([
			http.get(`${peer}/node/configuration/crypto`),
			http.get(`${peer}/node/syncing`),
		]);

		Managers.configManager.setConfig(crypto.json().data);
		Managers.configManager.setHeight(status.json().data.height);

		return { crypto: crypto.data, peer, status: status.data };
	}

	private static async makePeerService(config: Coins.Config): Promise<PeerService> {
		const { httpClient, network } = config.all();

		let peer: string;
		try {
			peer = config.get<string>("peer");
		} catch {
			peer = `${Arr.randomElement(network.networking.hosts)}/api`;
		}

		let seeds: string[] = [];

		// Validation
		let response;
		try {
			response = (await httpClient.get(`${peer}/node/configuration`)).json();
		} catch {
			// We don't know what went wrong so we continue.
		}

		if (response) {
			if (response.data.token !== network.currency.ticker) {
				throw new Error(`Failed to connect to ${peer} because it is on another network.`);
			}
		}

		// Seeds
		try {
			if (peer && isUrl(peer)) {
				const response = (await httpClient.get(`${peer}/peers`)).json();

				for (const seed of response.data) {
					let port = 4003;

					if (seed.ports) {
						const apiPort: number | undefined = seed.ports["@arkecosystem/core-api"];

						if (apiPort && apiPort >= 1 && apiPort <= 65535) {
							port = apiPort;
						}
					}

					seeds.push(`http://${seed.ip}:${port}`);
				}
			} else {
				seeds = config.get<string[]>("network.networking.hosts");
			}
		} catch {
			throw new Error("Failed to discovery any peers.");
		}

		if (!seeds.length) {
			throw new Error("No seeds found");
		}

		config.set("seeds", seeds);

		return PeerService.construct(config);
	}
}
