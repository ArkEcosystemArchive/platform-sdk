import { Coins, Collections, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";
import dotify from "node-dotify";

import { WalletData } from "../dto";
import * as TransactionDTO from "../dto";
import { guessBroadcastError } from "./client.errors";

interface BroadcastError {
	type: string;
	message: string;
}

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const body = await this.#get(`transactions/${id}`);

		return this.dataTransferObjectService
			.transaction(body.data, TransactionDTO)
			.withDecimals(this.configRepository.get(Coins.ConfigKey.CurrencyDecimals));
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection> {
		const response = this.#isUpcoming()
			? await this.#get("transactions", this.#createSearchParams(query))
			: await this.#post("transactions/search", this.#createSearchParams(query));

		return this.dataTransferObjectService.transactions(
			response.data,
			this.#createMetaPagination(response),
			TransactionDTO,

		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const body = await this.#get(`wallets/${id}`);

		return new WalletData(body.data);
	}

	public async wallets(query: Services.ClientWalletsInput): Promise<Collections.WalletDataCollection> {
		const response = this.#isUpcoming()
			? await this.#get("wallets", this.#createSearchParams(query))
			: await this.#post("wallets/search", this.#createSearchParams(query));

		return new Collections.WalletDataCollection(
			response.data.map((wallet) => new WalletData(wallet)),
			this.#createMetaPagination(response),
		);
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		const body = await this.#get(`delegates/${id}`);

		return new WalletData(body.data);
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Collections.WalletDataCollection> {
		const body = await this.#get("delegates", this.#createSearchParams(query || {}));

		return new Collections.WalletDataCollection(
			body.data.map((wallet) => new WalletData(wallet)),
			this.#createMetaPagination(body),
		);
	}

	public async votes(id: string): Promise<Services.VoteReport> {
		const { data } = await this.#get(`wallets/${id}`);

		const hasVoted = data.attributes?.vote !== undefined;

		return {
			used: hasVoted ? 1 : 0,
			available: hasVoted ? 0 : 1,
			publicKeys: hasVoted ? [data.attributes?.vote] : [],
		};
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Collections.WalletDataCollection> {
		const body = await this.#get(`delegates/${id}/voters`, this.#createSearchParams(query || {}));

		return new Collections.WalletDataCollection(
			body.data.map((wallet) => new WalletData(wallet)),
			this.#createMetaPagination(body),
		);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		let response: Contracts.KeyValuePair;

		try {
			response = await this.#post("transactions", {
				body: {
					transactions: transactions.map((transaction: Contracts.SignedTransactionData) =>
						transaction.toBroadcast(),
					),
				},
			});
		} catch (error) {
			response = error.response.json();
		}

		return this.#handleBroadcastResponse(response);
	}

	async #get(path: string, query?: Contracts.KeyValuePair): Promise<Contracts.KeyValuePair> {
		return (
			await this.httpClient.get(
				`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
				query?.searchParams,
			)
		).json();
	}

	async #post(path: string, { body, searchParams }: { body; searchParams? }): Promise<Contracts.KeyValuePair> {
		return (
			await this.httpClient.post(
				`${Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
				body,
				searchParams || undefined,
			)
		).json();
	}

	#createMetaPagination(body): Services.MetaPagination {
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

	#createSearchParams(body: Services.ClientPagination): { body: object | null; searchParams: object | null } {
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

		if (this.#isUpcoming()) {
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

		if (this.#isUpcoming()) {
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

	#handleBroadcastResponse(response): Services.BroadcastResponse {
		const { data, errors } = response;

		const result: Services.BroadcastResponse = {
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

	#isUpcoming(): boolean {
		return this.configRepository.get<string>("network.id") === "ark.devnet";
	}
}
