import { Coins, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { SignedBlock } from "nanocurrency-web/dist/lib/block-signer";

interface AccountInfoResponse {
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
}

interface AccountHistory {
	type: string;
	account: string;
	amount: string;
	local_timestamp: string;
	height: string;
	hash: string;
}

interface AccountHistoryResponse {
	account: string;
	history: AccountHistory[];
	previous: string;
}

export class NanoClient {
	readonly #http: HttpClient;

	public constructor(config: Coins.Config) {
		const host = Helpers.randomHostFromConfig(config);

		this.#http = config.get<HttpClient>(Coins.ConfigKey.HttpClient).baseUrl(host);
	}

	public async accountBalance(account: string): Promise<{ balance: string; pending: string }> {
		return this.#post("account_balance", { account });
	}

	public async accountInfo(
		account: string,
		options?: { representative?: boolean; pending?: boolean },
	): Promise<AccountInfoResponse> {
		return this.#post("account_info", { account, ...options });
	}

	public async accountHistory(
		account: string,
		count: string,
		options?: { head?: string | number },
	): Promise<AccountHistoryResponse> {
		return this.#post("account_history", { account, count, ...options });
	}

	public async process(
		subtype: "send" | "receive" | "open" | "change" | "epoch",
		block: SignedBlock,
	): Promise<{ hash: string }> {
		return this.#post("process", { json_block: "true", subtype, block });
	}

	async #post<T = Record<string, any>>(action: string, params: Record<string, unknown>): Promise<T> {
		const result = (await this.#http.post("/", { action, ...params })).json();

		if (result.error) {
			throw new Exceptions.Exception(`RPC error: ${JSON.stringify(result.error)}`);
		}

		return result as T;
	}
}
