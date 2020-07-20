import { Contracts } from "@arkecosystem/platform-sdk";
import got from "got";

export class HttpClient implements Contracts.HttpClient {
	public async get(path: string, searchParams?: Record<string, any>): Promise<Contracts.HttpClientResponse> {
		return got(path, { searchParams }).json();
	}

	public async post(path: string, body: object, headers = {}): Promise<Contracts.HttpClientResponse> {
		return got
			.post(path, {
				headers,
				json: body,
				responseType: "json",
			})
			.json();
	}
}
