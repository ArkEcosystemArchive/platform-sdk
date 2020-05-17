import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { manifest } from "../manifest";

export class PeerService implements Contracts.PeerService {
	readonly #seeds: string[];

	private constructor(network: string) {
		this.#seeds = manifest.networks[network].hosts;
	}

	public static async construct(config: Coins.Config): Promise<PeerService> {
		return new PeerService(config.get<string>("network"));
	}

	public async destruct(): Promise<void> {
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

	public async searchWithPlugin(name: string, opts: { additional?: string[] } = {}): Promise<Contracts.Peer[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWithPlugin");
	}

	public async searchWithoutEstimates(opts: { additional?: string[] } = {}): Promise<Contracts.Peer[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "searchWithoutEstimates");
	}
}
