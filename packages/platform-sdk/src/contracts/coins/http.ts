/**
 *
 *
 * @export
 * @interface HttpClient
 */
export interface HttpClient {
	/**
	 *
	 *
	 * @param {string} url
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	baseUrl(url: string): HttpClient;

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	asJson(): HttpClient;

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	asForm(): HttpClient;

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	asOctet(): HttpClient;

	/**
	 *
	 *
	 * @param {string} format
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	bodyFormat(format: string): HttpClient;

	/**
	 *
	 *
	 * @param {string} contentType
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	contentType(contentType: string): HttpClient;

	/**
	 *
	 *
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	acceptJson(): HttpClient;

	/**
	 *
	 *
	 * @param {string} contentType
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	accept(contentType: string): HttpClient;

	/**
	 *
	 *
	 * @param {object} headers
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	withHeaders(headers: object): HttpClient;

	/**
	 *
	 *
	 * @param {object} cache
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	withCacheStore(cache: object): HttpClient;

	/**
	 *
	 *
	 * @param {number} seconds
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	timeout(seconds: number): HttpClient;

	/**
	 *
	 *
	 * @param {number} times
	 * @param {number} [sleep]
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	retry(times: number, sleep?: number): HttpClient;

	/**
	 *
	 *
	 * @param {object} options
	 * @returns {HttpClient}
	 * @memberof HttpClient
	 */
	withOptions(options: object): HttpClient;

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof HttpClient
	 */
	get(url: string, query?: object): Promise<HttpResponse>;

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof HttpClient
	 */
	head(url: string, query?: object): Promise<HttpResponse>;

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof HttpClient
	 */
	post(url: string, data?: object, query?: object): Promise<HttpResponse>;

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof HttpClient
	 */
	patch(url: string, data?: object, query?: object): Promise<HttpResponse>;

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof HttpClient
	 */
	put(url: string, data?: object, query?: object): Promise<HttpResponse>;

	/**
	 *
	 *
	 * @param {string} url
	 * @param {object} [data]
	 * @param {object} [query]
	 * @returns {Promise<HttpResponse>}
	 * @memberof HttpClient
	 */
	delete(url: string, data?: object, query?: object): Promise<HttpResponse>;
}

/**
 *
 *
 * @export
 * @interface HttpResponse
 */
export interface HttpResponse {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof HttpResponse
	 */
	body(): string;

	/**
	 *
	 *
	 * @returns {Record<string, any>}
	 * @memberof HttpResponse
	 */
	json(): Record<string, any>;

	/**
	 *
	 *
	 * @param {string} header
	 * @returns {(string | undefined)}
	 * @memberof HttpResponse
	 */
	header(header: string): string | undefined;

	/**
	 *
	 *
	 * @returns {Record<string, any>}
	 * @memberof HttpResponse
	 */
	headers(): Record<string, any>;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof HttpResponse
	 */
	status(): number;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof HttpResponse
	 */
	successful(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof HttpResponse
	 */
	ok(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof HttpResponse
	 */
	redirect(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof HttpResponse
	 */
	failed(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof HttpResponse
	 */
	clientError(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof HttpResponse
	 */
	serverError(): boolean;
}
