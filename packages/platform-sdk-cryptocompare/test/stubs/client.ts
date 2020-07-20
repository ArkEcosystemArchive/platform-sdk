import { Contracts } from "@arkecosystem/platform-sdk";
import got from "got";

export class HttpClient implements Contracts.HttpClient {
	public async get(path: string, searchParams = {}): Promise<Contracts.HttpClientResponse> {
		return got.get(path, { searchParams }).json();
	}

	public async post(path: string, body, headers = {}): Promise<Contracts.HttpClientResponse> {
		return got.post(path, { body: JSON.stringify(body), headers }).json();
	}
}
