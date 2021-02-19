import { Request } from "@arkecosystem/platform-sdk-http-got";
import { chunk } from "@arkecosystem/utils";
// @ts-ignore
import urlParseLax from "url-parse-lax";
import { v4 as uuidv4 } from "uuid";

import { Flags } from "./types";

export class Client {
	readonly #client;

	public constructor(flags: Flags) {
		const { hostname: host, port, protocol } = urlParseLax(flags.host);

		this.#client = new Request().baseUrl(`${protocol}//${flags.username}:${flags.password}@${host}:${port}`);
	}

	public async height(): Promise<number> {
		return this.post<number>("getblockcount", []);
	}

	public async block(id: number): Promise<Record<string, any>> {
		return this.post("getblock", [await this.post("getblockhash", [id])]);
	}

	public async blockWithTransactions(id: number): Promise<Record<string, any>> {
		const block = await this.block(id);

		// @TODO: should we do this separately? During testing there have been blocks with thousands of transactions.
		if (block.tx) {
			block.transactions = [];

			const chunks = chunk(
				block.tx.map((transaction: string) => this.transaction(transaction)),
				10,
			);

			for (const chunk of chunks) {
				block.transactions = block.transactions.concat(await Promise.all(chunk));
			}
		}

		return block;
	}

	private async transaction(id: string): Promise<Record<string, any>> {
		return this.post("getrawtransaction", [id, true]);
	}

	private async post<T = Record<string, any>>(method: string, params: any): Promise<T> {
		return (
			await this.#client.post("/", {
				jsonrpc: "1.0",
				id: uuidv4(),
				method,
				params,
			})
		).json().result;
	}
}
