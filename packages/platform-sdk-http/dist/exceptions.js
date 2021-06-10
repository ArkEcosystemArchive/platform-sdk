"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadResponseException = exports.RequestException = exports.Exception = void 0;
class Exception extends Error {
	constructor(message) {
		super(message);
		Object.defineProperty(this, "message", {
			enumerable: false,
			value: message,
		});
		Object.defineProperty(this, "name", {
			enumerable: false,
			value: this.constructor.name,
		});
		Error.captureStackTrace(this, this.constructor);
	}
}
exports.Exception = Exception;
class RequestException extends Error {
	constructor(response, error) {
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
exports.RequestException = RequestException;
class BadResponseException extends Exception {
	constructor(code) {
		super(`Bad Response: ${code}`);
	}
}
exports.BadResponseException = BadResponseException;
//# sourceMappingURL=exceptions.js.map
