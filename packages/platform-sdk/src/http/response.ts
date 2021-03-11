import { HttpResponse } from "../contracts";
import { RequestException } from "./exceptions";

/**
 *
 *
 * @interface ResponseInput
 */
interface ResponseInput {
	body: string | undefined;
	headers: Record<string, any>;
	statusCode: number;
}

/**
 *
 *
 * @export
 * @class Response
 * @implements {HttpResponse}
 */
export class Response implements HttpResponse {
	/**
	 *
	 *
	 * @protected
	 * @type {ResponseInput}
	 * @memberof Response
	 */
	protected _response: ResponseInput;

	/**
	 *
	 *
	 * @protected
	 * @type {(Error | undefined)}
	 * @memberof Response
	 */
	protected _error: Error | undefined;

	/**
	 *
	 *
	 * @protected
	 * @type {(string | undefined)}
	 * @memberof Response
	 */
	protected _body: string | undefined;

	/**
	 *Creates an instance of Response.
	 * @param {ResponseInput} response
	 * @param {(Error | undefined)} [error]
	 * @memberof Response
	 */
	public constructor(response: ResponseInput, error?: Error | undefined) {
		this._response = response;
		this._body = response.body;
		this._error = error;

		this.throw();
	}

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof Response
	 */
	public body(): string {
		if (!this._body || this._body.length <= 0) {
			throw new Error("The response body is empty.");
		}

		return this._body;
	}

	/**
	 *
	 *
	 * @template T
	 * @returns {T}
	 * @memberof Response
	 */
	public json<T = Record<string, any>>(): T {
		return JSON.parse(this.body());
	}

	/**
	 *
	 *
	 * @param {string} header
	 * @returns {(string | undefined)}
	 * @memberof Response
	 */
	public header(header: string): string | undefined {
		return this.headers()[header];
	}

	/**
	 *
	 *
	 * @returns {Record<string, any>}
	 * @memberof Response
	 */
	public headers(): Record<string, any> {
		return this._response.headers;
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof Response
	 */
	public status(): number {
		return this._response.statusCode;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Response
	 */
	public successful(): boolean {
		return this.status() >= 200 && this.status() < 300;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Response
	 */
	public ok(): boolean {
		return this.status() === 200;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Response
	 */
	public redirect(): boolean {
		return this.status() >= 300 && this.status() < 400;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Response
	 */
	public failed(): boolean {
		return this.serverError() || this.clientError();
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Response
	 */
	public clientError(): boolean {
		return this.status() >= 400 && this.status() < 500;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Response
	 */
	public serverError(): boolean {
		return this.status() >= 500;
	}

	/**
	 *
	 *
	 * @private
	 * @memberof Response
	 */
	private throw(): void {
		if (this.serverError() || this.clientError()) {
			throw new RequestException(this, this._error);
		}
	}
}
