import { Contracts } from "@arkecosystem/platform-sdk";
import fetch from "node-fetch";

export class HttpClient implements Contracts.HttpClient {
	public async get(path: string, searchParams?: Record<string, any>): Promise<Contracts.HttpClientResponse> {
		const response = await fetch(searchParams ? `${path}?${new URLSearchParams(searchParams)}` : path);

		return response.json();
	}

	public async post(path: string, body: object, headers = {}): Promise<Contracts.HttpClientResponse> {
		const response = await fetch(path, { method: "POST", body: JSON.stringify(body), headers });

		return response.json();
	}
}
