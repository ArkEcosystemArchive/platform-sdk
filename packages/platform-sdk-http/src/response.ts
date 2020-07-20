import { Primitive } from "type-fest";

import { RequestException } from "./exceptions";

export abstract class Response {
	protected _response;

	protected _error: Error | undefined;

	protected _body: string;

	public constructor(response, error?: Error | undefined) {
		this._response = response;
		this._body = response.body || "";
		this._error = error;
	}

	public body(): string {
		return this._body;
	}

	public json(): Record<string, Primitive> {
		return JSON.parse(this._body);
	}

	public header(header: string): Primitive {
		return this.headers()[header];
	}

	public headers(): Record<string, Primitive> {
		return this._response.headers;
	}

	public status(): number {
		return this._response.statusCode;
	}

	public successful(): boolean {
		return this.status() >= 200 && this.status() < 300;
	}

	public ok(): boolean {
		return this.status() === 200;
	}

	public redirect(): boolean {
		return this.status() >= 300 && this.status() < 400;
	}

	public failed(): boolean {
		return this.serverError() || this.clientError();
	}

	public clientError(): boolean {
		return this.status() >= 400 && this.status() < 500;
	}

	public serverError(): boolean {
		return this.status() >= 500;
	}

	public throw(): Response {
		if (this.serverError() || this.clientError()) {
			throw new RequestException(this, this._error);
		}

		return this;
	}
}
