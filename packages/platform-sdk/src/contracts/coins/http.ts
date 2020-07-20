export type HttpClientResponse = Record<string, any>;

export interface HttpClient {
	get(path: string, query?: object): Promise<HttpClientResponse>;

	post(path: string, body: object, headers?: object): Promise<HttpClientResponse>;
}
