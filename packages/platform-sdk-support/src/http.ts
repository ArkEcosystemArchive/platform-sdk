import bent from "bent";

const ensureTrailingSlash = (url: string): string => {
	const lastCharacter = url.substr(-1);

	if (lastCharacter != "/") {
		url = url + "/";
	}

	return url;
};

export class Http {
	readonly #host: string | undefined;

	private constructor(host?: string) {
		this.#host = host ? ensureTrailingSlash(host) : undefined;
	}

	public static new(host?: string) {
		return new Http(host);
	}

	public async get(path: string, query: object = {}): Promise<Record<string, any>> {
		// @ts-ignore
		const searchParams: string = new URLSearchParams(query).toString();

		return bent("json")(searchParams ? `${this.#host}${path}?${searchParams}` : `${this.#host}${path}`);
	}

	public async post(path: string, body: object, headers: object = {}) {
		// @ts-ignore
		return bent(this.#host, "POST", "json", 200)(path, body, headers);
	}
}
