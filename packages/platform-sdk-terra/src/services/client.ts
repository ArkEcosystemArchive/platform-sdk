import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { LCDClient } from "@terra-money/terra.js";
import { Buffer } from "buffer";

import * as TransactionDTO from "../dto";
import { TransactionData, WalletData } from "../dto";
import { postGraphql, useClient } from "./helpers";
import { addressFromAccountExtPublicKey } from "./identity/shelley";

export class ClientService implements Contracts.ClientService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;
	readonly #peer: string;

	private constructor({ config, http, peer }) {
		this.#config = config;
		this.#http = http;
		this.#peer = peer;
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		try {
			return new ClientService({
				config,
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: config.get<string>("peer"),
			});
		} catch {
			return new ClientService({
				config,
				http: config.get<Contracts.HttpClient>("httpClient"),
				peer: Arr.randomElement(config.get<string[]>("network.networking.hosts")),
			});
		}
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(
		id: string,
		input?: Contracts.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		const result = (await this.post("/", {
			query: `
				{
					transactions(
						where: {
							hash: {
								_eq: "${id}"
							}
						}
					) {
						hash
						includedAt
						inputs {
							sourceTransaction {
       					hash
      				}
						  value
							address
						}
						outputs {
						  index
						  value
							address
						}
					}
				}
          `,
		})) as any;
		return new TransactionData(result.data.transactions[0]);
	}

	public async transactions(query: Contracts.ClientTransactionsInput): Promise<Coins.TransactionDataCollection> {
		if (query?.walletId === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transaction", "walletId");
		}

		const { usedSpendAddresses, usedChangeAddresses } = await this.usedAddressesForAccount(query?.walletId);

		const transactions = (await this.fetchTransactions(
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		)) as any;

		return Helpers.createTransactionDataCollectionWithType(
			transactions,
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
			TransactionDTO,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { usedSpendAddresses, usedChangeAddresses } = await this.usedAddressesForAccount(id);

		const balance = await this.fetchUtxosAggregate(
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);

		return new WalletData({
			id,
			balance,
		});
	}

	public async wallets(query: Contracts.ClientWalletsInput): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wallets");
	}

	public async delegate(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegate");
	}

	public async delegates(query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegates");
	}

	public async votes(id: string): Promise<Contracts.VoteReport> {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public async voters(id: string, query?: Contracts.KeyValuePair): Promise<Coins.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, "voters");
	}

	public async syncing(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "syncing");
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Contracts.BroadcastResponse> {
		const result: Contracts.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				const { txhash } = await this.useClient().tx.broadcast(transaction.toBroadcast());

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	public async broadcastSpread(
		transactions: Contracts.SignedTransactionData[],
		hosts: string[],
	): Promise<Contracts.BroadcastResponse> {
		throw new Exceptions.NotImplemented(this.constructor.name, "broadcastSpread");
	}

	private useClient(): LCDClient {
		try {
			return useClient(
				this.#config.get<string>("peer"),
				this.#config.get(Coins.ConfigKey.CryptoChainId),
			);
		} catch {
			return useClient(
				`${Arr.randomElement(this.#config.get<string[]>("network.networking.hosts"))}/api`,
				this.#config.get(Coins.ConfigKey.CryptoChainId),
			);
		}
	}
}
