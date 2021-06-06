import { Coins, Collections, Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import * as TransactionDTO from "../dto";
import { TransactionData, WalletData } from "../dto";
import { fetchTransaction, fetchTransactions, fetchUtxosAggregate, submitTransaction } from "./graphql-helpers";
import { usedAddressesForAccount } from "./helpers";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	#decimals!: number;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#decimals = this.configRepository.get(Coins.ConfigKey.CurrencyDecimals);
	}

	public async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.TransactionDataType> {
		return this.dataTransferObjectService.transaction(await fetchTransaction(id, this.configRepository), TransactionDTO).withDecimals(this.#decimals);
	}

	public async transactions(query: Services.ClientTransactionsInput): Promise<Collections.TransactionDataCollection> {
		if (query.senderPublicKey === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transactions.name, "senderPublicKey");
		}

		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(
			this.configRepository,
			query.senderPublicKey,
		);

		const transactions = await fetchTransactions(
			this.configRepository,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);

		return this.dataTransferObjectService.transactions(
			transactions,
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
			TransactionDTO,
			this.#decimals,
		);
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(this.configRepository, id);

		const balance = await fetchUtxosAggregate(
			this.configRepository,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);

		return new WalletData({
			id,
			balance,
		});
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				await submitTransaction(this.configRepository, transaction.toBroadcast());

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}
}
