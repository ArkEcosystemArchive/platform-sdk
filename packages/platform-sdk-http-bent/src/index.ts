import { Contracts } from "@arkecosystem/platform-sdk";
import bent from "bent";

export class HttpClient implements Contracts.HttpClient {
	public async get(path: string, searchParams?: Record<string, any>): Promise<Contracts.HttpClientResponse> {
		return bent("json")(searchParams ? `${path}?${new URLSearchParams(searchParams)}` : path);
	}

	public async post(path: string, body: object, headers = {}): Promise<Contracts.HttpClientResponse> {
		// @ts-ignore
		return (await bent("POST")(path, body, headers)).json();
	}
}
