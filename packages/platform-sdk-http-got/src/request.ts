import { Contracts, Http } from "@arkecosystem/platform-sdk";
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

		// try {
			return new Http.Response(await got[method.toLowerCase()](url.replace(/^\/+/g, ""), options));
		// } catch (error) {
		// 	return new Http.Response(error.response, error);
		// }
	}
}
