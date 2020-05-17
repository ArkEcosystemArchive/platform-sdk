import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PeerService implements Contracts.PeerService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<PeerService> {
		return new PeerService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public getSeeds(): Contracts.Peer[] {
		throw new Exceptions.NotImplemented(this.constructor.name, "getSeeds");
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
