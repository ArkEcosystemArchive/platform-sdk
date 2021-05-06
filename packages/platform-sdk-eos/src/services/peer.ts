import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PeerService implements Contracts.PeerService {
	readonly #seeds: string[];

	private constructor(network: Coins.NetworkManifest) {
		this.#seeds = network.networking.hosts;
	}

	public static async __construct(config: Coins.Config): Promise<PeerService> {
		return new PeerService(config.get<Coins.NetworkManifest>("network"));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public getSeeds(): string[] {
		return this.#seeds;
	}

	public withVersion(version: string): PeerService {
		throw new Exceptions.NotImplemented(this.constructor.name, "withVersion");
	}

	public withLatency(latency: number): PeerService {
		throw new Exceptions.NotImplemented(this.constructor.name, "withLatency");
	}

	public sortBy(key: string, direction = "desc"): PeerService {
		throw new Exceptions.NotImplemented(this.constructor.name, "sortBy");
	}

	public async search(opts: any = {}): Promise<Contracts.PeerResponse[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "search");
	}
}
