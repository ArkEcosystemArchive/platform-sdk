"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const platform_sdk_http_1 = require("@arkecosystem/platform-sdk-http");
const axios_1 = __importDefault(require("axios"));
/**
 * Implements HTTP communication through axios/axios.
 *
 * @see https://github.com/axios/axios
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
		options.method = method;
		if (data && data.query) {
			options.params = data.query;
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
			const response = await axios_1.default[method.toLowerCase()](url.replace(/^\/+/g, ""), options);
			return new platform_sdk_http_1.Response({
				body: JSON.stringify(response.data),
				headers: response.headers,
				statusCode: response.status,
			});
		} catch (error) {
			return new platform_sdk_http_1.Response(
				{
					body: JSON.stringify(error.response.data),
					headers: error.response.headers,
					statusCode: error.response.status,
				},
				error,
			);
		}
	}
}
exports.Request = Request;
//# sourceMappingURL=request.js.map
