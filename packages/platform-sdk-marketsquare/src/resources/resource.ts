import { Contracts } from "@arkecosystem/platform-sdk";

export abstract class Resource {
	readonly #client: Contracts.HttpClient;

	public constructor(client: Contracts.HttpClient) {
		this.#client = client;
	}

	public async get<T>(path: string, query?: object): Promise<T> {
		return (await this.#client.post(path, { query })).json() as T;
	}

	public async post<T>(path: string, body: object): Promise<T> {
		return (await this.#client.post(path, { body })).json() as T;
	}

	public async put<T>(path: string, body: object): Promise<T> {
		return (await this.#client.put(path, { body })).json() as T;
	}

	protected getClient(): Contracts.HttpClient {
		return this.#client;
	}
}
