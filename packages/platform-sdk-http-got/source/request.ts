import { AbstractRequest, HttpResponse, RequestOptions, Response } from "@arkecosystem/platform-sdk-http";
import FormData from "form-data";
import got from "got";
import { URLSearchParams } from "url";

/**
 * Implements HTTP communication through sindresorhus/got.
 *
 * @see https://github.com/sindresorhus/got
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

		if (data && data.query) {
			// @ts-ignore
			options.searchParams = new URLSearchParams(data.query);
		}

		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}

			if (this._bodyFormat === "form_params") {
				options.body = new FormData();

				for (const [key, value] of Object.entries(data.data)) {
					options.body.append(key, value);
				}
			}

			if (this._bodyFormat === "octet") {
				options.body = Buffer.from(data.data, "hex");
			}
		}

		try {
			return new Response(await got[method.toLowerCase()](url.replace(/^\/+/g, ""), options));
		} catch (error) {
			console.log(error);
			return new Response(error.response, error);
		}
	}
}
