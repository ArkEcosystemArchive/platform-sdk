// import { Contracts } from "@arkecosystem/platform-sdk";
// import axios from "axios";

// export class HttpClient implements Contracts.HttpClient {
// 	public async get(path: string, searchParams?: Record<string, any>): Promise<Contracts.HttpClientResponse> {
// 		const response = await axios.get(path, { params: searchParams });

// 		return response.data;
// 	}

// 	public async post(path: string, body: object, headers = {}): Promise<Contracts.HttpClientResponse> {
// 		const response = await axios.post(path, body, { headers });

// 		return response.data;
// 	}
// }

import axios from "axios";
import http from "http";
import https from "https";
import { URLSearchParams } from "url";

import { ensureTrailingSlash } from "./helpers";
import { Response } from "./response";

type RequestOptions = Record<string, any>;

export class Request {
	#bodyFormat!: string;

	#options: RequestOptions = {};

	public constructor() {
		this.asJson();
	}

	public static new(url: string): Request {
		return new Request().baseUrl(url);
	}

	public baseUrl(url: string): Request {
		this.#options.prefixUrl = ensureTrailingSlash(url);

		return this;
	}

	public asJson(): Request {
		return this.bodyFormat("json").contentType("application/json");
	}

	public asForm(): Request {
		return this.bodyFormat("form_params").contentType("application/x-www-form-urlencoded");
	}

	public asMultipart(): Request {
		return this.bodyFormat("multipart");
	}

	public bodyFormat(format: string): Request {
		this.#bodyFormat = format;

		return this;
	}

	public contentType(contentType: string): Request {
		return this.withHeaders({ "Content-Type": contentType });
	}

	public acceptJson(): Request {
		return this.accept("application/json");
	}

	public accept(contentType: string): Request {
		return this.withHeaders({ Accept: contentType });
	}

	public withHeaders(headers: object): Request {
		this.#options.headers = { ...this.#options.headers, ...headers };

		return this;
	}

	public withoutRedirecting(): Request {
		this.#options.followRedirects = false;

		return this;
	}

	public withoutVerifying(): Request {
		this.#options.verify = false;

		return this;
	}

	public withAgent(agent: { http; https }): Request {
		this.#options.agent = agent;

		return this;
	}

	public timeout(seconds: number): Request {
		this.#options.timeout = seconds;

		return this;
	}

	public retry(times: number, sleep?: number): Request {
		this.#options.retry = {
			limit: times,
			maxRetryAfter: sleep,
		};

		return this;
	}

	public withOptions(options: object): Request {
		this.#options = { ...this.#options, ...options };

		return this;
	}

	public async get(url: string, query?: object): Promise<Response> {
		return this.send("GET", url, { query });
	}

	public async head(url: string, query?: object): Promise<Response> {
		return this.send("HEAD", url, { query });
	}

	public async post(url: string, data?: object): Promise<Response> {
		return this.send("POST", url, { data });
	}

	public async patch(url: string, data?: object): Promise<Response> {
		return this.send("PATCH", url, { data });
	}

	public async put(url: string, data?: object): Promise<Response> {
		return this.send("PUT", url, { data });
	}

	public async delete(url: string, data?: object): Promise<Response> {
		return this.send("DELETE", url, { data });
	}

	private async send(method: string, url: string, data?: { query?: object; data?: any }): Promise<Response> {
		const options: RequestOptions = {
			...this.#options,
		};

		if (data && data.query) {
			options.searchParams = data.query;
		}

		if (data && data.data) {
			if (this.#bodyFormat === "json") {
				options.json = data.data;
			}

			if (this.#bodyFormat === "form_params") {
				options.body = new URLSearchParams();

				for (const [key, value] of Object.entries(data.data)) {
					options.body.set(key, value);
				}
			}

			if (this.#bodyFormat === "multipart") {
				options.body = new FormData();

				for (const [key, value] of Object.entries(data.data)) {
					options.body.append(key, value);
				}
			}
		}

		try {
			return new Response(await got[method.toLowerCase()](url.replace(/^\/+/g, ""), options));
		} catch (error) {
			return new Response(error.response, error);
		}
	}
}
