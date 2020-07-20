import { Contracts, Http } from "@arkecosystem/platform-sdk";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

import { Response } from "./response";

export class Request extends Http.Request {
	protected async send(
		method: string,
		url: string,
		data?: { query?: object; data?: any },
	): Promise<Contracts.HttpResponse> {
		const options: Http.RequestOptions = {
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
				throw new Error("Method form_params is not supported.");
			}

			if (this._bodyFormat === "multipart") {
				throw new Error("Method multipart is not supported.");
			}
		}

		try {
			const response = await fetch(url.replace(/^\/+/g, ""), options);

			return new Response({
				body: await response.json(),
				headers: response.headers,
				statusCode: response.status,
			});
		} catch (error) {
			return new Response(error.response, error);
		}
	}
}
