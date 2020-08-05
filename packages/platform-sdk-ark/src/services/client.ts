import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "../dto";
import * as DTO from "../dto";

export class ClientService implements Contracts.ClientService {
	readonly #http: Contracts.HttpClient;
	readonly #peer: string;

	private constructor({ http, peer }) {
		this.#http = http;
		this.#peer = peer;
	}

	public static async construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: config.get<string>("peer"),
			});
		} catch {
			return new ClientService({
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: `${Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts)}/api`,
			});
		}
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const body = await this.get(`transactions/${id}`);

		return Helpers.createTransactionDataWithType(body.data, DTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const response = await this.post("transactions/search", this.createSearchParams(query));

		return Helpers.createTransactionDataCollectionWithType(response.data, this.createMetaPagination(response), DTO);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const body = await this.get(`wallets/${id}`);

		return new WalletData(body.data);
	}

	public async wallets(query: Contracts.ClientWalletsInput): Promise<Coins.WalletDataCollection> {
		const response = await this.post("wallets/search", this.createSearchParams(query));

		return new Coins.WalletDataCollection(
			response.data.map((wallet) => new WalletData(wallet)),
			this.createMetaPagination(response),
		);
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		const body = await this.get(`delegates/${id}`);

		return new WalletData(body.data);
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		const body = await this.get("delegates", query);

		return new Coins.WalletDataCollection(
			body.data.map((wallet) => new WalletData(wallet)),
			this.createMetaPagination(body),
		);
	}

	public async votes(id: string, query?: Contracts.KeyValuePair): Promise<Coins.TransactionDataCollection> {
		const body = await this.get(`wallets/${id}/votes`, query);

		return Helpers.createTransactionDataCollectionWithType(body.data, this.createMetaPagination(body), DTO);
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		const body = await this.get(`delegates/${id}/voters`, query);

		return new Coins.WalletDataCollection(
			body.data.map((wallet) => new WalletData(wallet)),
			this.createMetaPagination(body),
		);
	}

	public async syncing(): Promise<boolean> {
		const body = await this.get("node/syncing");

		return body.data.syncing;
	}

	public async broadcast(transactions: Contracts.SignedTransaction[]): Promise<Contracts.BroadcastResponse> {
		const { data, errors } = await this.post("transactions", { body: { transactions } });

		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		if (Array.isArray(data.accept)) {
			result.accepted = data.accept;
		}

		if (Array.isArray(data.invalid)) {
			result.rejected = data.invalid;
		}

		if (errors) {
			for (const [key, value] of Object.entries(errors)) {
				if (!Array.isArray(result.errors[key])) {
					result.errors[key] = [];
				}

				// @ts-ignore
				for (const error of value) {
					// @ts-ignore
					result.errors[key].push(error.type);
				}
			}
		}

		return result;
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.get(`${this.#peer}/${path}`, query);

		return response.json();
	}

	private async post(path: string, { body, searchParams }: { body; searchParams? }): Promise<Contracts.KeyValuePair> {
		const response = await this.#http.post(`${this.#peer}/${path}`, body, searchParams || undefined);

		return response.json();
	}

	private createMetaPagination(body): Contracts.MetaPagination {
		const getPage = (url: string): string | undefined => {
			const match: RegExpExecArray | null = RegExp(/page=(\d+)/).exec(url);

			return match ? match[1] || undefined : undefined;
		};

		return {
			prev: getPage(body.meta.previous) || undefined,
			self: getPage(body.meta.self) || undefined,
			next: getPage(body.meta.next) || undefined,
		};
	}

	private createSearchParams(body: Contracts.ClientPagination): { body: object; searchParams: object } {
		const result = {
			body,
			searchParams: {},
		};

		for (const [alias, original] of Object.entries({
			cursor: "page",
			limit: "limit",
			orderBy: "orderBy",
		})) {
			if (body[alias]) {
				result.searchParams[original] = body[alias];

				delete result.body[alias];
			}
		}

		return result;
	}
}
