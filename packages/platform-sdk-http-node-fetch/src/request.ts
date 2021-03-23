import { Contracts, Http } from "@arkecosystem/platform-sdk";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

/**
 * Implements HTTP communication through node-fetch/node-fetch.
 *
 * @see https://github.com/node-fetch/node-fetch
 *
 * @export
 * @class Request
 * @extends {Http.Request}
 */
export class Request extends Http.Request {
	/** {@inheritDoc Http.Request.send} */
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

			return new Http.Response({
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

			return new Http.Response(
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
