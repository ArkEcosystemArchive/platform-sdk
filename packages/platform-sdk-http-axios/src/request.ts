// import { Contracts } from "@arkecosystem/platform-sdk";
// import axios from "axios";

// export class HttpClient implements Contracts.HttpClient {
// 	public async get(path: string, searchParams?: Record<string, any>): Promise<Contracts.HttpClientResponse> {
// 		const response = await axios.get(path, { params: searchParams });

// 		return response.data;
// 	}

// 	public async post(path: string, body: object, headers = {}): Promise<Contracts.HttpClientResponse> {
// 		const response = await axios.post(path, body, { headers });

// 		return response.data;
// 	}
// }

import { Contracts } from "@arkecosystem/platform-sdk";
import { Request as BaseRequest, RequestOptions } from "@arkecosystem/platform-sdk-http";
import axios from "axios";
import { URLSearchParams } from "url";

import { Response } from "./response";

export class Request extends BaseRequest implements Contracts.HttpClient {
	protected async send(method: string, url: string, data?: { query?: object; data?: any }): Promise<Response> {
		const options: RequestOptions = {
			...this._options,
		};

		options.method = method;

		if (data && data.query) {
			options.params = data.query;
		}

		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}

			if (this._bodyFormat === "form_params") {
				throw new Error("Method form_params is not supported.");
			}

			if (this._bodyFormat === "multipart") {
				throw new Error("Method multipart is not supported.");
			}
		}

		try {
			const response = await axios[method.toLowerCase()](url.replace(/^\/+/g, ""), options);

			return new Response({
				body: response.data,
				headers: response.headers,
				statusCode: response.status,
			});
		} catch (error) {
			return new Response(error.response, error);
		}
	}
}
