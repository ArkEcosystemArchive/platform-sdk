import { Request } from "@arkecosystem/platform-sdk-http-got";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class NanoClient {
	readonly #http: Contracts.HttpClient;

	public constructor(host: string) {
		this.#http = new Request().baseUrl(host);
	}

	public async accountBalance(account: string): Promise<{balance: string; pending: string}> {
		return this.post("account_balance", { account });
	}

	public async accountInfo(account: string, representative = true): Promise<{
		balance: string;
		frontier: string;
		representative: string;
	}> {
		return this.post("account_info", { account, representative: representative.toString() });
	}

	private async post<T = Record<string, any>>(action: string, params: Record<string, unknown>): Promise<T> {
		const result = (await this.#http.post("/", { action, ...params })).json();

		if (result.error) {
			throw new Exceptions.Exception(`RPC error: ${JSON.stringify(result.error)}`);
		}

		return result as T;
	} 
}
