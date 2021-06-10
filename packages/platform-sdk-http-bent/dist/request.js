"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const platform_sdk_http_1 = require("@arkecosystem/platform-sdk-http");
const bent_1 = __importDefault(require("bent"));
const url_1 = require("url");
/**
 * Implements HTTP communication through mikeal/bent.
 *
 * @see https://github.com/mikeal/bent
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
		url = url.replace(/^\/+/g, "");
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
				options.body = new url_1.URLSearchParams();
				for (const [key, value] of Object.entries(data.data)) {
					options.body.set(key, value);
				}
			}
		}
		try {
			let response;
			if (method === "GET") {
				response = await bent_1.default(method)(url);
			} else {
				response = await bent_1.default(method)(url, options.json || options.body, options.headers);
			}
			return new platform_sdk_http_1.Response({
				body: await response.text(),
				headers: response.headers,
				statusCode: response.statusCode,
			});
		} catch (error) {
			return new platform_sdk_http_1.Response(
				{
					body: await error.text(),
					headers: error.headers,
					statusCode: error.statusCode,
				},
				error,
			);
		}
	}
}
exports.Request = Request;
//# sourceMappingURL=request.js.map
