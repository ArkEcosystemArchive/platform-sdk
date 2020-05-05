import { Contracts } from "@arkecosystem/platform-sdk";
import isUrl from "is-url-superb";
import ky from "ky-universal";
import orderBy from "lodash.orderby";
import semver from "semver";

export class PeerService implements Contracts.PeerService {
	private constructor(private readonly seeds: Contracts.Peer[]) {}

	public static async construct(options: Contracts.KeyValuePair): Promise<PeerService> {
		let { networkOrHost, defaultPort } = options;

		if (!defaultPort) {
			defaultPort = 4003;
		}

		if (!networkOrHost || typeof networkOrHost !== "string") {
			throw new Error("No network or host provided");
		}

		const seeds: Contracts.Peer[] = [];

		try {
			if (isUrl(networkOrHost)) {
				const body: any = await ky.get(networkOrHost).json();

				for (const seed of body.data) {
					let port = defaultPort;
					if (seed.ports) {
						const walletApiPort = seed.ports["@arkecosystem/core-wallet-api"];
						const apiPort = seed.ports["@arkecosystem/core-api"];
						if (walletApiPort >= 1 && walletApiPort <= 65535) {
							port = walletApiPort;
						} else if (apiPort >= 1 && apiPort <= 65535) {
							port = apiPort;
						}
					}

					seeds.push({ ip: seed.ip, port });
				}
			} else {
				const body: any = await ky
					.get(`https://raw.githubusercontent.com/ArkEcosystem/peers/master/${networkOrHost}.json`)
					.json();

				for (const seed of body) {
					seeds.push({ ip: seed.ip, port: defaultPort });
				}
			}
		} catch (error) {
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

	public getSeeds(): Contracts.Peer[] {
		return this.seeds;
	}

	public async search(options: Contracts.KeyValuePair = {}): Promise<Contracts.PeerResponse[]> {
		if (!options.retry) {
			options.retry = { limit: 0 };
		}

		if (!options.timeout) {
			options.timeout = 3000;
		}

		const seed: Contracts.Peer = this.seeds[Math.floor(Math.random() * this.seeds.length)];

		const body: any = await ky(`http://${seed.ip}:${seed.port}/api/v2/peers`, {
			...options,
			...{
				headers: {
					"Content-Type": "application/json",
				},
			},
		}).json();

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

		const requests = apiPeers.map((peer) => ky.get(`http://${peer.ip}:${peer.port}/api/v2/blocks?limit=1`).json());

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
