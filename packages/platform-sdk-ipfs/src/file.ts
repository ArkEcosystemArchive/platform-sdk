import { Contracts } from "@arkecosystem/platform-sdk";

export class File {
	readonly #client: Contracts.HttpClient;

	public constructor(client: Contracts.HttpClient) {
		this.#client = client;
	}

	public async upload(data: string): Promise<string> {
		return (await this.#client.post("https://platform.ark.io/api/ipfs", { data })).json().data.hash;
	}
}
