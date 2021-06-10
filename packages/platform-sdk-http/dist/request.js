"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRequest = void 0;
const helpers_1 = require("./helpers");
class AbstractRequest {
	constructor() {
		Object.defineProperty(this, "_bodyFormat", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "_options", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: {},
		});
		this.asJson();
	}
	baseUrl(url) {
		this._options.prefixUrl = helpers_1.ensureTrailingSlash(url);
		return this;
	}
	asJson() {
		return this.bodyFormat("json").contentType("application/json");
	}
	asForm() {
		return this.bodyFormat("form_params").contentType("application/x-www-form-urlencoded");
	}
	asOctet() {
		return this.bodyFormat("octet").contentType("application/octet-stream");
	}
	bodyFormat(format) {
		this._bodyFormat = format;
		return this;
	}
	contentType(contentType) {
		return this.withHeaders({ "Content-Type": contentType });
	}
	acceptJson() {
		return this.accept("application/json");
	}
	accept(contentType) {
		return this.withHeaders({ Accept: contentType });
	}
	withHeaders(headers) {
		this._options.headers = { ...this._options.headers, ...headers };
		return this;
	}
	withCacheStore(cache) {
		this._options.cache = cache;
		return this;
	}
	timeout(seconds) {
		this._options.timeout = seconds;
		return this;
	}
	retry(times, sleep) {
		this._options.retry = {
			limit: times,
			maxRetryAfter: sleep,
		};
		return this;
	}
	withOptions(options) {
		this._options = { ...this._options, ...options };
		return this;
	}
	async get(url, query) {
		return this.send("GET", url, { query });
	}
	async head(url, query) {
		return this.send("HEAD", url, { query });
	}
	async post(url, data, query) {
		return this.send("POST", url, { data, query });
	}
	async patch(url, data, query) {
		return this.send("PATCH", url, { data, query });
	}
	async put(url, data, query) {
		return this.send("PUT", url, { data, query });
	}
	async delete(url, data, query) {
		return this.send("DELETE", url, { data, query });
	}
}
exports.AbstractRequest = AbstractRequest;
//# sourceMappingURL=request.js.map
