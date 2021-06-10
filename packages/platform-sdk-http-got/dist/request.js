"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const platform_sdk_http_1 = require("@arkecosystem/platform-sdk-http");
const form_data_1 = __importDefault(require("form-data"));
const got_1 = __importDefault(require("got"));
const url_1 = require("url");
/**
 * Implements HTTP communication through sindresorhus/got.
 *
 * @see https://github.com/sindresorhus/got
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
			// @ts-ignore
			options.searchParams = new url_1.URLSearchParams(data.query);
		}
		if (data && data.data) {
			if (this._bodyFormat === "json") {
				options.json = data.data;
			}
			if (this._bodyFormat === "form_params") {
				options.body = new form_data_1.default();
				for (const [key, value] of Object.entries(data.data)) {
					options.body.append(key, value);
				}
			}
			if (this._bodyFormat === "octet") {
				options.body = Buffer.from(data.data, "hex");
			}
		}
		try {
			return new platform_sdk_http_1.Response(
				await got_1.default[method.toLowerCase()](url.replace(/^\/+/g, ""), options),
			);
		} catch (error) {
			return new platform_sdk_http_1.Response(error.response, error);
		}
	}
}
exports.Request = Request;
//# sourceMappingURL=request.js.map
