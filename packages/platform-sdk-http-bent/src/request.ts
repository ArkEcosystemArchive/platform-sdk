// import { Contracts } from "@arkecosystem/platform-sdk";
// import bent from "bent";

// export class HttpClient implements Contracts.HttpClient {
// 	public async get(path: string, searchParams?: Record<string, any>): Promise<Contracts.HttpClientResponse> {
// 		return bent("json")(searchParams ? `${path}?${new URLSearchParams(searchParams)}` : path);
// 	}

// 	public async post(path: string, body: object, headers = {}): Promise<Contracts.HttpClientResponse> {
// 		// @ts-ignore
// 		return (await bent("POST")(path, body, headers)).json();
// 	}
// }

import { Contracts } from "@arkecosystem/platform-sdk";
import { Request as BaseRequest, RequestOptions } from "@arkecosystem/platform-sdk-http";
import got from "got";
import { URLSearchParams } from "url";

import { Response } from "./response";

export class Request extends BaseRequest implements Contracts.HttpClient {
	protected async send(method: string, url: string, data?: { query?: object; data?: any }): Promise<Response> {
		const options: RequestOptions = {
			...this._options,
		};

		if (data && data.query) {
			options.searchParams = data.query;
		}

		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}

			if (this._bodyFormat === "form_params") {
				options.body = new URLSearchParams();

				for (const [key, value] of Object.entries(data.data)) {
					options.body.set(key, value);
				}
			}

			if (this._bodyFormat === "multipart") {
				options.body = new FormData();

				for (const [key, value] of Object.entries(data.data)) {
					options.body.append(key, value);
				}
			}
		}

		try {
			return new Response(await got[method.toLowerCase()](url.replace(/^\/+/g, ""), options));
		} catch (error) {
			return new Response(error.response, error);
		}
	}
}
