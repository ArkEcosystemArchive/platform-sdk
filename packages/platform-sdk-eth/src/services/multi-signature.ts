import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class MultiSignatureService implements Contracts.MultiSignatureService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>("httpClient");
	}

	public static async construct(config: Coins.Config): Promise<MultiSignatureService> {
		return new MultiSignatureService(config);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async all(publicKey: string, state?: string): Promise<any[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public async findById(id: string): Promise<Contracts.MultiSignatureTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public async broadcast(transaction: Contracts.MultiSignatureTransaction): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}
}
