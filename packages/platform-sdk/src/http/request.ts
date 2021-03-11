import { HttpClient, HttpResponse } from "../contracts";
import { ensureTrailingSlash } from "./helpers";
import { RequestOptions } from "./request.models";

/**
 *
 *
 * @export
 * @abstract
 * @class Request
 * @implements {HttpClient}
 */
export abstract class Request implements HttpClient {
	/**
	 *
	 *
	 * @protected
	 * @type {string}
	 * @memberof Request
	 */
	protected _bodyFormat!: string;

	/**
	 *
	 *
	 * @protected
	 * @type {RequestOptions}
	 * @memberof Request
	 */
	protected _options: RequestOptions = {};

	/**
	 *Creates an instance of Request.
	 * @memberof Request
	 */
	public constructor() {
		this.asJson();
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public baseUrl(url: string): HttpClient {
		this._options.prefixUrl = ensureTrailingSlash(url);

		return this;
	}

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public asJson(): HttpClient {
		return this.bodyFormat("json").contentType("application/json");
	}

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public asForm(): HttpClient {
		return this.bodyFormat("form_params").contentType("application/x-www-form-urlencoded");
	}

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public asOctet(): HttpClient {
		return this.bodyFormat("octet").contentType("application/octet-stream");
	}

	/**
	 *
	 *
	 * @param {string} format
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public bodyFormat(format: string): HttpClient {
		this._bodyFormat = format;

		return this;
	}

	/**
	 *
	 *
	 * @param {string} contentType
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public contentType(contentType: string): HttpClient {
		return this.withHeaders({ "Content-Type": contentType });
	}

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public acceptJson(): HttpClient {
		return this.accept("application/json");
	}

	/**
	 *
	 *
	 * @param {string} contentType
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public accept(contentType: string): HttpClient {
		return this.withHeaders({ Accept: contentType });
	}

	/**
	 *
	 *
	 * @param {object} headers
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public withHeaders(headers: object): HttpClient {
		this._options.headers = { ...this._options.headers, ...headers };

		return this;
	}

	/**
	 *
	 *
	 * @param {object} cache
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public withCacheStore(cache: object): HttpClient {
		this._options.cache = cache;

		return this;
	}

	/**
	 *
	 *
	 * @param {number} seconds
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public timeout(seconds: number): HttpClient {
		this._options.timeout = seconds;

		return this;
	}

	/**
	 *
	 *
	 * @param {number} times
	 * @param {number} [sleep]
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public retry(times: number, sleep?: number): HttpClient {
		this._options.retry = {
			limit: times,
			maxRetryAfter: sleep,
		};

		return this;
	}

	/**
	 *
	 *
	 * @param {object} options
	 * @returns {HttpClient}
	 * @memberof Request
	 */
	public withOptions(options: object): HttpClient {
		this._options = { ...this._options, ...options };

		return this;
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof Request
	 */
	public async get(url: string, query?: object): Promise<HttpResponse> {
		return this.send("GET", url, { query });
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof Request
	 */
	public async head(url: string, query?: object): Promise<HttpResponse> {
		return this.send("HEAD", url, { query });
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof Request
	 */
	public async post(url: string, data?: object, query?: object): Promise<HttpResponse> {
		return this.send("POST", url, { data, query });
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof Request
	 */
	public async patch(url: string, data?: object, query?: object): Promise<HttpResponse> {
		return this.send("PATCH", url, { data, query });
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof Request
	 */
	public async put(url: string, data?: object, query?: object): Promise<HttpResponse> {
		return this.send("PUT", url, { data, query });
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof Request
	 */
	public async delete(url: string, data?: object, query?: object): Promise<HttpResponse> {
		return this.send("DELETE", url, { data, query });
	}

	/**
	 *
	 *
	 * @protected
	 * @abstract
	 * @param {string} method
	 * @param {string} url
	 * @param {{ query?: object; data?: any }} [data]
	 * @returns {Promise<HttpResponse>}
	 * @memberof Request
	 */
	protected abstract send(method: string, url: string, data?: { query?: object; data?: any }): Promise<HttpResponse>;
}
