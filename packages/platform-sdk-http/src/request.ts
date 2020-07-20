import { ensureTrailingSlash } from "./helpers";
import { RequestOptions } from "./request.models";
import { Response } from "./response";

export abstract class Request {
	protected _bodyFormat!: string;

	protected _options: RequestOptions = {};

	public constructor() {
		this.asJson();
	}

	public baseUrl(url: string): Request {
		this._options.prefixUrl = ensureTrailingSlash(url);

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
		this._bodyFormat = format;

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
		this._options.headers = { ...this._options.headers, ...headers };

		return this;
	}

	public withoutRedirecting(): Request {
		this._options.followRedirects = false;

		return this;
	}

	public withoutVerifying(): Request {
		this._options.verify = false;

		return this;
	}

	public withAgent(agent: { http; https }): Request {
		this._options.agent = agent;

		return this;
	}

	public timeout(seconds: number): Request {
		this._options.timeout = seconds;

		return this;
	}

	public retry(times: number, sleep?: number): Request {
		this._options.retry = {
			limit: times,
			maxRetryAfter: sleep,
		};

		return this;
	}

	public withOptions(options: object): Request {
		this._options = { ...this._options, ...options };

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

	protected abstract async send(
		method: string,
		url: string,
		data?: { query?: object; data?: any },
	): Promise<Response>;
}
