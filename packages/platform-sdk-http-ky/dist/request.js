"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const platform_sdk_http_1 = require("@arkecosystem/platform-sdk-http");
const ky_universal_1 = __importDefault(require("ky-universal"));
/**
 * Implements HTTP communication through sindresorhus/ky.
 *
 * @see https://github.com/sindresorhus/ky
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
		if (data && data.query) {
			options.searchParams = data.query;
		}
		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}
			if (this._bodyFormat === "form_params") {
				throw new Error("form_params is not supported.");
			}
		}
		try {
			const response = await ky_universal_1.default[method.toLowerCase()](url.replace(/^\/+/g, ""), options);
			return new platform_sdk_http_1.Response({
				body: await response.text(),
				headers: response.headers,
				statusCode: response.status,
			});
		} catch (error) {
			const { response } = error;
			return new platform_sdk_http_1.Response(
				{
					body: await response.text(),
					headers: response.headers,
					statusCode: response.status,
				},
				error,
			);
		}
	}
}
exports.Request = Request;
//# sourceMappingURL=request.js.map
