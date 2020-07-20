import { Contracts } from "@arkecosystem/platform-sdk";
import { Request as BaseRequest, RequestOptions } from "@arkecosystem/platform-sdk-http";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

import { Response } from "./response";

export class Request extends BaseRequest implements Contracts.HttpClient {
	protected async send(method: string, url: string, data?: { query?: object; data?: any }): Promise<Response> {
		const options: RequestOptions = {
			...this._options,
		};

		options.method = method.toUpperCase();

		if (data && data.query) {
			options.searchParams = data.query;
		}

		if (options.searchParams) {
			url = options.searchParams ? `${url}?${new URLSearchParams(options.searchParams)}` : url;
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
			return new Response(await fetch(url.replace(/^\/+/g, ""), options));
		} catch (error) {
			return new Response(error.response, error);
		}
	}
}
