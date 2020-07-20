import { Response } from "./response";

export class RequestException extends Error {
	public constructor(response: Response, error?: Error) {
		const message = error
			? `HTTP request returned status code ${response.status()}: ${error.message}`
			: `HTTP request returned status code ${response.status()}.`;

		super(message);

		Object.defineProperty(this, "message", {
			enumerable: false,
			value: message,
		});

		Object.defineProperty(this, "name", {
			enumerable: false,
			value: this.constructor.name,
		});

		Object.defineProperty(this, "response", {
			enumerable: false,
			value: response,
		});

		Error.captureStackTrace(this, this.constructor);
	}
}
