import { Request } from "@arkecosystem/platform-sdk-http-got";
import Logger from "@ptkdev/logger";
import retry from "p-retry";
// @ts-ignore
import urlParseLax from "url-parse-lax";
import { v4 as uuidv4 } from "uuid";

import { useQueue } from "./helpers";
import { Flags } from "./types";

export class Client {
	readonly #client;
	readonly #logger: Logger;

	public constructor(flags: Flags, logger: Logger) {
		const { hostname: host, port, protocol } = urlParseLax(flags.host);

		this.#client = new Request().baseUrl(`${protocol}//${flags.username}:${flags.password}@${host}:${port}`);
		this.#logger = logger;
	}

	public async height(): Promise<number> {
		return this.post<number>("getblockcount", []);
	}

	public async block(id: number): Promise<Record<string, any>> {
		return this.post("getblock", [await this.post("getblockhash", [id])]);
	}

	public async blockWithTransactions(id: number): Promise<Record<string, any>> {
		const block = await this.block(id);

		if (block.tx) {
			const queue = useQueue({ autoStart: true, concurrency: 5 });

			block.transactions = [];

			for (const transaction of block.tx) {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				queue.add(() =>
					retry(
						async () => this.transaction(transaction),
						{
							onFailedAttempt: (error) => {
								this.#logger.error(`[blockWithTransactions] Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`)
							},
							retries: 5,
						},
					),
				);
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
