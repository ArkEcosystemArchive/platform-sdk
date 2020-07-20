import { Http } from "@arkecosystem/platform-sdk";

export class Response extends Http.Response {
	public constructor(response, error?: Error | undefined) {
		super(response, error);

		this._body = JSON.stringify(response.body);
	}
}
