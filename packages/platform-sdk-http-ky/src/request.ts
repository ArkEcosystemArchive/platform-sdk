import { Contracts, Http } from "@arkecosystem/platform-sdk";
import ky from "ky-universal";

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

			return new Http.Response({
				body: await response.text(),
				headers: response.headers,
				statusCode: response.status,
			});
		} catch (error) {
			const { response } = error;

			return new Http.Response(
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
