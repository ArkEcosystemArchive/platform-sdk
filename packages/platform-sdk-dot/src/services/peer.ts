import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class PeerService implements Contracts.PeerService {
	public static async construct(config: Coins.Config): Promise<PeerService> {
		return new PeerService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public getSeeds(): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, "findById");
	}

	public async search(options: Contracts.KeyValuePair = {}): Promise<Contracts.PeerResponse[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "findById");
	}
}
