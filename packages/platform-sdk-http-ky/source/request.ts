import { AbstractRequest, HttpResponse, RequestOptions, Response } from "@arkecosystem/platform-sdk-http";
import ky from "ky-universal";

/**
 * Implements HTTP communication through sindresorhus/ky.
 *
 * @see https://github.com/sindresorhus/ky
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
			options.searchParams = data.query;
		}

		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}

			if (this._bodyFormat === "form_params") {
				throw new Error("form_params is not supported.");
			}
		}

		try {
			const response = await ky[method.toLowerCase()](url.replace(/^\/+/g, ""), options);

			return new Response({
				body: await response.text(),
				headers: response.headers,
				statusCode: response.status,
			});
		} catch (error) {
			const { response } = error;

			return new Response(
				{
					body: await response.text(),
					headers: response.headers,
					statusCode: response.status,
				},
				error,
			);
		}
	}
}
