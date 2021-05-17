import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

export class NanoClient {
	readonly #http: Contracts.HttpClient;

	public constructor(host: string) {
		this.#http = new Request().baseUrl(host);
	}

	public async accountBalance(account: string): Promise<{ balance: string; pending: string }> {
		return this.post("account_balance", { account });
	}

	public async accountInfo(
		account: string,
		options?: { representative?: boolean, pending?: boolean },
	): Promise<{
		frontier: string;
		open_block: string;
		representative_block: string;
		balance: string;
		modified_timestamp: string;
		block_count: string;
		account_version: string;
		confirmation_height: string;
		confirmation_height_frontier: string;
		representative: string;
		pending: string;
	}> {
		return this.post("account_info", { account, ...options });
	}

	public async accountHistory(
		account: string,
		count: string,
		options?: { head?: string | number },
	): Promise<{
		account: string;
		history: Array<{type: string; account: string; amount: string; local_timestamp: string; height: string; hash: string }>;
		previous: string;
	}> {
		return this.post("account_history", { account, count, ...options });
	}


	private async post<T = Record<string, any>>(action: string, params: Record<string, unknown>): Promise<T> {
		const result = (await this.#http.post("/", { action, ...params })).json();

		if (result.error) {
			throw new Exceptions.Exception(`RPC error: ${JSON.stringify(result.error)}`);
		}

		return result as T;
	}
}
