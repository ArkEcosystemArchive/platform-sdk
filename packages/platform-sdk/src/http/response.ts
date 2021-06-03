import { HttpResponse } from "../contracts";
import { RequestException } from "./exceptions";

interface ResponseInput {
	body: string | undefined;
	headers: Record<string, any>;
	statusCode: number;
}

export class Response implements HttpResponse {
	protected _response: ResponseInput;

	protected _error: Error | undefined;

	protected _body: string | undefined;

	public constructor(response: ResponseInput, error?: Error | undefined) {
		this._response = response;
		this._body = response.body;
		this._error = error;

		this.#throw();
	}

	public body(): string {
		if (!this._body || this._body.length <= 0) {
			throw new Error("The response body is empty.");
		}

		return this._body;
	}

	public json<T = Record<string, any>>(): T {
		return JSON.parse(this.body());
	}

	public header(header: string): string | undefined {
		return this.headers()[header];
	}

	public headers(): Record<string, any> {
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

	#throw(): void {
		if (this.serverError() || this.clientError()) {
			throw new RequestException(this, this._error);
		}
	}
}
