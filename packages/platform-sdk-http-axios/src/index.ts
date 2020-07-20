import { Contracts } from "@arkecosystem/platform-sdk";
import axios from "axios";

export class HttpClient implements Contracts.HttpClient {
	public async get(path: string, searchParams?: Record<string, any>): Promise<Contracts.HttpClientResponse> {
		const response = await axios.get(path, { params: searchParams });

		return response.data;
	}

	public async post(path: string, body: object, headers = {}): Promise<Contracts.HttpClientResponse> {
		const response = await axios.post(path, body, { headers });

		return response.data;
	}
}
