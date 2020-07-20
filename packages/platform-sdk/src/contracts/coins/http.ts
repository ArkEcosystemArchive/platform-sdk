import { Primitive } from "type-fest";

export interface HttpClient {
	baseUrl(url: string): HttpClient;

	asJson(): HttpClient;

	asForm(): HttpClient;

	asMultipart(): HttpClient;

	bodyFormat(format: string): HttpClient;

	contentType(contentType: string): HttpClient;

	acceptJson(): HttpClient;

	accept(contentType: string): HttpClient;

	withHeaders(headers: object): HttpClient;

	timeout(seconds: number): HttpClient;

	retry(times: number, sleep?: number): HttpClient;

	withOptions(options: object): HttpClient;

	get(url: string, query?: object): Promise<HttpResponse>;

	head(url: string, query?: object): Promise<HttpResponse>;

	post(url: string, data?: object): Promise<HttpResponse>;

	patch(url: string, data?: object): Promise<HttpResponse>;

	put(url: string, data?: object): Promise<HttpResponse>;

	delete(url: string, data?: object): Promise<HttpResponse>;
}

export interface HttpResponse {
	body(): string;

	json(): Record<string, Primitive>;

	header(header: string): Primitive;

	headers(): Record<string, Primitive>;

	status(): number;

	successful(): boolean;

	ok(): boolean;

	redirect(): boolean;

	failed(): boolean;

	clientError(): boolean;

	serverError(): boolean;

	throw(): HttpResponse;
}
