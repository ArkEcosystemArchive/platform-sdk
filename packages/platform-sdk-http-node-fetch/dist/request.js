"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const platform_sdk_http_1 = require("@arkecosystem/platform-sdk-http");
const node_fetch_1 = __importDefault(require("node-fetch"));
const url_1 = require("url");
/**
 * Implements HTTP communication through node-fetch/node-fetch.
 *
 * @see https://github.com/node-fetch/node-fetch
 *
 * @export
 * @class Request
 * @extends {Request}
 */
class Request extends platform_sdk_http_1.AbstractRequest {
	/** {@inheritDoc Request.send} */
	async send(method, url, data) {
		const options = {
			...this._options,
		};
		options.method = method.toUpperCase();
		if (data && data.query) {
			options.searchParams = data.query;
		}
		if (options.searchParams) {
			url = `${url}?${new url_1.URLSearchParams(options.searchParams)}`;
		}
		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}
			if (this._bodyFormat === "form_params") {
				throw new Error("Method form_params is not supported.");
			}
		}
		try {
			const response = await node_fetch_1.default(url.replace(/^\/+/g, ""), options);
			return new platform_sdk_http_1.Response({
				body: await response.text(),
				headers: response.headers.raw(),
				statusCode: response.status,
			});
		} catch (error) {
			let body;
			try {
				body = await error.response.body();
			} catch (error) {
				body = undefined;
			}
			return new platform_sdk_http_1.Response(
				{
					body,
					headers: error.response.headers(),
					statusCode: error.response.status(),
				},
				error,
			);
		}
	}
}
exports.Request = Request;
//# sourceMappingURL=request.js.map
