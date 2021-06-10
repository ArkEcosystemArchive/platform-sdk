import { AbstractRequest, HttpResponse } from "@arkecosystem/platform-sdk-http";
/**
 * Implements HTTP communication through sindresorhus/ky.
 *
 * @see https://github.com/sindresorhus/ky
 *
 * @export
 * @class Request
 * @extends {Request}
 */
export declare class Request extends AbstractRequest {
	/** {@inheritDoc Request.send} */
	protected send(
		method: string,
		url: string,
		data?: {
			query?: object;
			data?: any;
		},
	): Promise<HttpResponse>;
}
