import { Contracts, Http } from "@arkecosystem/platform-sdk";
import axios from "axios";

/**
 * Implements HTTP communication through axios/axios.
 *
 * @see https://github.com/axios/axios
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
		}

		try {
			const response = await axios[method.toLowerCase()](url.replace(/^\/+/g, ""), options);

			return new Http.Response({
				body: JSON.stringify(response.data),
				headers: response.headers,
				statusCode: response.status,
			});
		} catch (error) {
			return new Http.Response(
				{
					body: JSON.stringify(error.response.data),
					headers: error.response.headers,
					statusCode: error.response.status,
				},
				error,
			);
		}
	}
}
