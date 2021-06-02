import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";
import dotify from "node-dotify";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";
import { guessBroadcastError } from "./client.errors";

interface BroadcastError {
	type: string;
	message: string;
}

export class ClientService extends Services.AbstractClientService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;
	readonly #network: string;

	private constructor(config: Coins.Config) {
		super();

		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
		this.#network = config.get<string>("network.id");
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const body = await this.get(`transactions/${id}`);

		return Helpers.createTransactionDataWithType(body.data, TransactionDTO);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		const response = this.isUpcoming()
			? await this.get("transactions", this.createSearchParams(query))
			: await this.post("transactions/search", this.createSearchParams(query));

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
		const response = this.isUpcoming()
			? await this.get("wallets", this.createSearchParams(query))
			: await this.post("wallets/search", this.createSearchParams(query));

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

		const hasVoted = data.attributes?.vote !== undefined;

		return {
			used: hasVoted ? 1 : 0,
			available: hasVoted ? 0 : 1,
			publicKeys: hasVoted ? [data.attributes?.vote] : [],
		};
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		const body = await this.get(`delegates/${id}/voters`, this.createSearchParams(query || {}));

		return new Coins.WalletDataCollection(
			body.data.map((wallet) => new WalletData(wallet)),
			this.createMetaPagination(body),
		);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		let response: Contracts.KeyValuePair;

		try {
			response = await this.post("transactions", {
				body: {
					transactions: transactions.map((transaction: Contracts.SignedTransactionData) =>
						transaction.toBroadcast(),
					),
				},
			});
		} catch (error) {
			response = error.response.json();
		}

		return this.handleBroadcastResponse(response);
	}

	private async get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (
			await this.#http.get(`${Helpers.randomHostFromConfig(this.#config)}/${path}`, query?.searchParams)
		).json();
	}

	private async post(path: string, { body, searchParams }: { body; searchParams? }): Promise<Contracts.KeyValuePair> {
		return (
			await this.#http.post(
				`${Helpers.randomHostFromConfig(this.#config)}/${path}`,
				body,
				searchParams || undefined,
			)
		).json();
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
			last: getPage(body.meta.last) || undefined,
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

		const mappings: Record<string, string> = {
			cursor: "page",
			limit: "limit",
			orderBy: "orderBy",
			memo: "vendorField",
		};

		if (this.isUpcoming()) {
			Object.assign(mappings, {
				address: "address",
				recipientId: "recipientId",
				senderId: "senderId",
				senderPublicKey: "senderPublicKey",
			});
		}

		for (const [alias, original] of Object.entries(mappings)) {
			if (body[alias]) {
				result.searchParams[original] = body[alias];

				delete result.body[alias];
			}
		}

		if (this.isUpcoming()) {
			// @ts-ignore
			const addresses: string[] | undefined = body.addresses as string[];

			if (Array.isArray(addresses)) {
				result.searchParams.address = addresses.join(",");

				// @ts-ignore
				delete body.addresses;
			}

			result.searchParams = dotify({ ...result.searchParams, ...result.body });
			result.body = null;
		}

		return result;
	}

	private handleBroadcastResponse(response): Contracts.BroadcastResponse {
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
			const responseErrors: [string, BroadcastError][] = Object.entries(errors);

			for (const [key, value] of responseErrors) {
				if (Array.isArray(value)) {
					if (!Array.isArray(result.errors[key])) {
						result.errors[key] = [];
					}

					for (const error of value) {
						result.errors[key].push(guessBroadcastError(error.message));
					}
				} else {
					result.errors[key] = [guessBroadcastError(value.message)];
				}
			}
		}

		return result;
	}

	private isUpcoming(): boolean {
		return this.#network === "ark.devnet";
	}
}
