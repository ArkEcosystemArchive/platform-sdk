import { Contracts } from "@arkecosystem/platform-sdk";

export abstract class Resource {
	readonly #client: Contracts.HttpClient;

	public constructor(client: Contracts.HttpClient) {
		this.#client = client;
	}

	public async get(path: string, query?: object): Promise<any> {
		return this.#client.post(path, { query });
	}

	public async post(path: string, body: object): Promise<any> {
		return this.#client.post(path, { body });
	}

	public async put(path: string, body: object): Promise<any> {
		return this.#client.put(path, { body });
	}

	protected getClient(): Contracts.HttpClient {
		return this.#client;
	}
}
