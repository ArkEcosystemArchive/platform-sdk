import { Coins, Contracts, DTO, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";

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

		return Helpers.createTransactionDataWithType(body.data, TransactionDTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const response = await this.post("transactions/search", this.createSearchParams(query));

		return Helpers.createTransactionDataCollectionWithType(
			response.data,
			this.createMetaPagination(response),
			TransactionDTO,
		);
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
		const body = await this.get("delegates", this.createSearchParams(query || {}));

		return new Coins.WalletDataCollection(
			body.data.map((wallet) => new WalletData(wallet)),
			this.createMetaPagination(body),
		);
	}

	public async votes(id: string): Promise<Contracts.VoteReport> {
		const { data } = await this.get(`wallets/${id}`);

		const hasVoted = data.vote !== undefined;

		return {
			used: hasVoted ? 1 : 0,
			available: hasVoted ? 0 : 1,
			publicKeys: hasVoted ? [data.vote] : [],
		};
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		const body = await this.get(`delegates/${id}/voters`, this.createSearchParams(query || {}));

		return new Coins.WalletDataCollection(
			body.data.map((wallet) => new WalletData(wallet)),
			this.createMetaPagination(body),
		);
	}

	public async syncing(): Promise<boolean> {
		const body = await this.get("node/syncing");

		return body.data.syncing;
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		let response: Contracts.KeyValuePair;
		try {
			response = await this.post("transactions", {
				body: {
					transactions: transactions.map((transaction: Contracts.SignedTransactionData) =>
						transaction.data(),
					),
				},
			});
		} catch (error) {
			response = error.response.json();
		}

		const { data, errors } = response;

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
		return (await this.#http.get(`${this.#peer}/${path}`, query?.searchParams)).json();
	}

	private async post(path: string, { body, searchParams }: { body; searchParams? }): Promise<Contracts.KeyValuePair> {
		return (await this.#http.post(`${this.#peer}/${path}`, body, searchParams || undefined)).json();
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

	private createSearchParams(body: Contracts.ClientPagination): { body: object | null; searchParams: object | null } {
		if (Object.keys(body).length <= 0) {
			return { body: null, searchParams: null };
		}

		const result: any = {
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

		if (result.body.entityType && result.body.entityAction) {
			result.body.type = 6;
			result.body.typeGroup = 2;

			if (result.body.entityType !== "all") {
				result.body.asset = {
					type: {
						business: 0,
						corePlugin: 3,
						delegate: 4,
						developer: 2,
						desktopWalletPlugin: 3,
						plugin: 3,
					}[result.body.entityType],
					action: { register: 0, update: 1, resign: 2 }[result.body.entityAction],
				};

				// If the type is "plugin" we will skip the "subType" filter to list everything.
				if (result.body.entityType !== "plugin") {
					result.body.asset.subType = {
						business: 0,
						developer: 0,
						corePlugin: 1,
						delegate: 0,
						desktopWalletPlugin: 2,
						plugin: 0,
					}[result.body.entityType];
				}
			}

			delete result.body.entityType;
			delete result.body.entityAction;
		}

		return result;
	}
}
