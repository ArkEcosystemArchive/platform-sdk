import { Response as BaseResponse } from "@arkecosystem/platform-sdk-http";

export class Response extends BaseResponse {
	public constructor(response, error?: Error | undefined) {
		super(response, error);

		this._body = JSON.stringify(response.body);
	}
}
