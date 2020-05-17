import { Coins, Contracts, Utils } from "@arkecosystem/platform-sdk";
import isUrl from "is-url-superb";
import orderBy from "lodash.orderby";
import semver from "semver";

import { manifest } from "../manifest";

export class PeerService implements Contracts.PeerService {
	readonly #seeds: string[];

	private constructor(seeds: string[]) {
		this.#seeds = seeds;
	}

	public static async construct(config: Coins.Config): Promise<PeerService> {
		const { peer } = config.all();

		let seeds: string[] = [];

		try {
			if (peer && isUrl(peer)) {
				const response = await Utils.Http.new(peer).get("peers");

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
				seeds = manifest.networks[config.get<string>("network")].hosts;
			}
		} catch {
			throw new Error("Failed to discovery any peers.");
		}

		if (!seeds.length) {
			throw new Error("No seeds found");
		}

		return new PeerService(seeds);
	}

	public async destruct(): Promise<void> {
		//
	}

	public getSeeds(): string[] {
		return this.#seeds;
	}

	public async search(options: Contracts.KeyValuePair = {}): Promise<Contracts.PeerResponse[]> {
		const seed: string = this.#seeds[Math.floor(Math.random() * this.#seeds.length)];

		const body: any = await Utils.Http.new(seed).get("api/peers");

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

	public async searchWithPlugin(name: string, options: { additional?: string[] } = {}): Promise<Contracts.Peer[]> {
		const peers: Contracts.Peer[] = [];

		for (const peer of await this.search(options)) {
			const pluginName: string | undefined = Object.keys(peer.ports).find(
				(key: string) => key.split("/")[1] === name,
			);

			if (pluginName) {
				const port: number = peer.ports[pluginName];

				if (port >= 1 && port <= 65535) {
					const peerData: Contracts.Peer = {
						ip: peer.ip,
						port,
					};

					if (options.additional && Array.isArray(options.additional)) {
						for (const additional of options.additional) {
							if (typeof peer[additional] === "undefined") {
								continue;
							}

							peerData[additional] = peer[additional];
						}
					}

					peers.push(peerData);
				}
			}
		}

		return peers;
	}

	public async searchWithoutEstimates(options: { additional?: string[] } = {}): Promise<Contracts.Peer[]> {
		const apiPeers: Contracts.Peer[] = await this.searchWithPlugin("core-api", options);

		const requests = apiPeers.map((peer) =>
			Utils.Http.new(`http://${peer.ip}:${peer.port}`).get("api/blocks?limit=1"),
		);

		const responses = await Promise.all(requests);

		const peers: Contracts.Peer[] = [];

		for (let i = 0; i < responses.length; i++) {
			if (!(responses[i] as any).meta.totalCountIsEstimate) {
				peers.push(apiPeers[i]);
			}
		}

		return peers;
	}
}
