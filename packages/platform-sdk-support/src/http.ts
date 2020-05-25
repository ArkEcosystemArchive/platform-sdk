import { Reqwest } from "@kodekeep/reqwest";

export class Http {
	readonly #client: Reqwest;

	private constructor(host: string) {
		this.#client = Reqwest.new(host);
	}

	public static new(host: string) {
		return new Http(host);
	}

	public async get(path: string, query: object = {}): Promise<Record<string, any>> {
		return (await this.#client.get(path, query)).throw().json();
	}

	public async post(path: string, body: object, headers: object = {}) {
		return (await this.#client.withHeaders(headers).post(path, body)).throw().json();
	}
}
