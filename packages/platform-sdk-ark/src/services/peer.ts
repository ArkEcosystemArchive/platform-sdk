import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import orderBy from "lodash.orderby";
import semver from "semver";

export class PeerService implements Contracts.PeerService {
	readonly #http: Contracts.HttpClient;
	readonly #seeds: string[];

	private constructor(config: Coins.Config) {
		this.#http = config.get("httpClient");
		this.#seeds = config.get("sseds");
	}

	public static async construct(config: Coins.Config): Promise<PeerService> {
		return new PeerService(config);
	}

	public async destruct(): Promise<void> {
		//
	}

	public getSeeds(): string[] {
		return this.#seeds;
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
}
