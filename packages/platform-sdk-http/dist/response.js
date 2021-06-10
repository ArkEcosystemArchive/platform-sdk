"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _Response_instances, _Response_throw;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const exceptions_1 = require("./exceptions");
class Response {
	constructor(response, error) {
		_Response_instances.add(this);
		Object.defineProperty(this, "_response", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "_error", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "_body", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		this._response = response;
		this._body = response.body;
		this._error = error;
		__classPrivateFieldGet(this, _Response_instances, "m", _Response_throw).call(this);
	}
	body() {
		if (!this._body || this._body.length <= 0) {
			throw new Error("The response body is empty.");
		}
		return this._body;
	}
	json() {
		return JSON.parse(this.body());
	}
	header(header) {
		return this.headers()[header];
	}
	headers() {
		return this._response.headers;
	}
	status() {
		return this._response.statusCode;
	}
	successful() {
		return this.status() >= 200 && this.status() < 300;
	}
	ok() {
		return this.status() === 200;
	}
	redirect() {
		return this.status() >= 300 && this.status() < 400;
	}
	failed() {
		return this.serverError() || this.clientError();
	}
	clientError() {
		return this.status() >= 400 && this.status() < 500;
	}
	serverError() {
		return this.status() >= 500;
	}
}
exports.Response = Response;
(_Response_instances = new WeakSet()),
	(_Response_throw = function _Response_throw() {
		if (this.serverError() || this.clientError()) {
			throw new exceptions_1.RequestException(this, this._error);
		}
	});
//# sourceMappingURL=response.js.map
