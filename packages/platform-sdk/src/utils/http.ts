import bent from "bent";

import { KeyValuePair } from "../contracts";
import { ensureTrailingSlash } from "./normalise";

export class Http {
	readonly #host: string | undefined;

	private constructor (host?: string) {
		this.#host = host ? ensureTrailingSlash(host) : undefined;
	}

	public static new(host?: string) {
		return new Http(host);
	}

	public async get(path: string, query: object = {}): Promise<KeyValuePair> {
		// @ts-ignore
		const searchParams: string = new URLSearchParams(query).toString();

		return bent("json")(searchParams ? `${this.#host}${path}?${searchParams}` : `${this.#host}${path}`);
	}

	public async post(path: string, body: object, headers: object = {}) {
		return bent(this.#host, "POST", "json", 200)(path, body, headers);
	}
}
