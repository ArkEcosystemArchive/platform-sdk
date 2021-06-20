import { Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";

import { WalletData } from "./wallet.dto";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	readonly #broadcastErrors: Record<string, string> = {
		"failed to marshal JSON bytes": "ERR_JSON_MARSHAL",
		"failed to unmarshal JSON bytes": "ERR_JSON_UNMARSHAL",
		"insufficient account funds": "ERR_INSUFFICIENT_FUNDS",
		"insufficient fee": "ERR_INSUFFICIENT_FEE",
		"insufficient funds": "ERR_INSUFFICIENT_FUNDS",
		"invalid account password": "ERR_WRONG_PASSWORD",
		"invalid address": "ERR_INVALID_ADDRESS",
		"invalid coins": "ERR_INVALID_COINS",
		"invalid gas adjustment": "ERROR_INVALID_GAS_ADJUSTMENT",
		"invalid pubkey": "ERR_INVALID_PUB_KEY",
		"invalid request": "ERR_INVALID_REQUEST",
		"invalid sequence": "ERR_INVALID_SEQUENCE",
		"key not found": "ERR_KEY_NOT_FOUND",
		"maximum number of signatures exceeded": "ERR_TOO_MANY_SIGNATURES",
		"memo too large": "ERR_MEMO_TOO_LARGE",
		"mempool is full": "ERR_MEMPOOL_IS_FULL",
		"no signatures supplied": "ERR_NO_SIGNATURES",
		"out of gas": "ERR_OUT_OF_GAS",
		"tx already in mempool": "ERR_TX_IN_MEMPOOL_CACHE",
		"tx intended signer does not match the given signer": "ERROR_INVALID_SIGNER",
		"tx parse error": "ERR_TX_DECODE",
		"tx too large": "ERR_TX_TOO_LARGE",
		"unknown address": "ERR_UNKNOWN_ADDRESS",
		"unknown request": "ERR_UNKNOWN_REQUEST",
		internal: "ERR_INTERNAL",
		panic: "ERR_PANIC",
		unauthorized: "ERR_UNAUTHORIZED",
	};

	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const response = await this.#get(`txs/${id}`);

		return this.dataTransferObjectService.transaction(response);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.TransactionDataCollection> {
		const page = Number(query.cursor || 1);

		const response = await this.#get("txs", {
			"message.action": "send",
			"message.sender": query.address,
			page,
			limit: query.limit || 100,
		});

		return this.dataTransferObjectService.transactions(response.txs, {
			prev: page <= 1 ? undefined : page - 1,
			self: Number(response.page_number),
			next: page >= Number(response.page_total) ? undefined : page,
			last: response.page_total,
		});
	}

	public override async wallet(id: string): Promise<Contracts.WalletData> {
		const { result: details } = await this.#get(`auth/accounts/${id}`);
		const { result: balance } = await this.#get(`bank/balances/${id}`);

		return this.dataTransferObjectService.wallet({
			address: details.value.address,
			publicKey: details.value.public_key.value,
			balance: Object.values(balance).find(({ denom }: any) => denom === "uatom"),
			sequence: details.value.sequence,
		});
	}

	public override async broadcast(
		transactions: Contracts.SignedTransactionData[],
	): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			const { logs, txhash } = await this.#post("txs", { mode: "block", tx: transaction });

			transaction.setAttributes({ identifier: txhash });

			if (logs[0].success === true) {
				result.accepted.push(txhash);
			} else {
				const { message } = JSON.parse(logs[0].log);

				if (message) {
					result.rejected.push(txhash);

					if (!Array.isArray(result.errors[txhash])) {
						result.errors[txhash] = [];
					}

					for (const [key, value] of Object.entries(this.#broadcastErrors)) {
						if (message.includes(key)) {
							result.errors[txhash].push(value);
						}
					}
				}
			}
		}

		return result;
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.httpClient.get(
			`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
			query,
		);

		return response.json();
	}

	async #post(path: string, body: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.httpClient.post(
			`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
			body,
		);

		return response.json();
	}
}
