import { AbstractRequest, HttpResponse, RequestOptions, Response } from "@arkecosystem/platform-sdk-http";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

/**
 * Implements HTTP communication through node-fetch/node-fetch.
 *
 * @see https://github.com/node-fetch/node-fetch
 *
 * @export
 * @class Request
 * @extends {Request}
 */
export class Request extends AbstractRequest {
	/** {@inheritDoc Request.send} */
	protected async send(method: string, url: string, data?: { query?: object; data?: any }): Promise<HttpResponse> {
		const options: RequestOptions = {
			...this._options,
		};

		options.method = method.toUpperCase();

		if (data && data.query) {
			options.searchParams = data.query;
		}

		if (options.searchParams) {
			url = `${url}?${new URLSearchParams(options.searchParams)}`;
		}

		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}

			if (this._bodyFormat === "form_params") {
				throw new Error("Method form_params is not supported.");
			}
		}

		try {
			const response = await fetch(url.replace(/^\/+/g, ""), options);

			return new Response({
				body: await response.text(),
				headers: response.headers.raw(),
				statusCode: response.status,
			});
		} catch (error) {
			let body: string | undefined;

			try {
				body = await error.response.body();
			} catch (error) {
				body = undefined;
			}

			return new Response(
				{
					body,
					headers: error.response.headers(),
					statusCode: error.response.status(),
				},
				error,
			);
		}
	}
}
