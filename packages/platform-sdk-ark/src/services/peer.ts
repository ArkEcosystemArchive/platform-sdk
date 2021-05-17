import { Coins, Contracts, Http } from "@arkecosystem/platform-sdk";
import isUrl from "is-url-superb";
import orderBy from "lodash.orderby";
import semver from "semver";

import { getPeerFromConfig } from "../helpers";

export class PeerService implements Contracts.PeerService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;
	readonly #seeds: string[];

	private constructor({ config, httpClient, seeds }) {
		this.#config = config;
		this.#http = httpClient;
		this.#seeds = seeds;
	}

	public static async __construct(config: Coins.Config): Promise<PeerService> {
		const { httpClient } = config.all();

		const peer: string = getPeerFromConfig(config);

		return new PeerService({ config, httpClient, seeds });
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async search(options: Contracts.KeyValuePair = {}): Promise<Contracts.PeerResponse[]> {
		const seed: string = this.#seeds[Math.floor(Math.random() * this.#seeds.length)];

		const body: any = (await this.#http.get(`${seed}/api/peers`)).json();

		let peers: Contracts.PeerResponse[] = body.data;

		if (options.filters && options.filters.version !== undefined) {
			peers = peers.filter((peer: Contracts.PeerResponse) =>
				semver.satisfies(peer.version, options.filters.version),
			);
		}

		if (options.filters && options.filters.latency !== undefined) {
			peers = peers.filter((peer: Contracts.PeerResponse) => peer.latency <= options.filters.latency);
		}

		if (!options.orderBy) {
			options.orderBy = ["latency", "desc"];
		}

		return orderBy(peers, [options.orderBy[0]], [options.orderBy[1]]);
	}

	public async validate(url: string): Promise<boolean> {
		const http: Contracts.HttpClient = this.#config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);

		const response = await http.get(`${url}/node/configuration/crypto`);

		if (response.json().data.network.client.token !== this.#config.get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Http.BadResponseException(`ERR_NETWORK_MISMATCH`);
		}

		if (response.failed()) {
			throw new Http.BadResponseException(`ERR_FAILED`);
		}

		return true;
	}
}
