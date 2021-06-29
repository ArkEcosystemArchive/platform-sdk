import { Collections, Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { WalletData } from "./wallet.dto";
import { fetchTransaction, fetchTransactions, fetchUtxosAggregate, submitTransaction } from "./graphql-helpers";
import { usedAddressesForAccount } from "./transaction.domain";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.ConfirmedTransactionData> {
		return this.dataTransferObjectService.transaction(
			await fetchTransaction(id, this.configRepository, this.httpClient),
		);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.ConfirmedTransactionDataCollection> {
		if (query.senderPublicKey === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transactions.name, "senderPublicKey");
		}

		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(
			this.configRepository,
			this.httpClient,
			query.senderPublicKey,
		);

		const transactions = await fetchTransactions(
			this.configRepository,
			this.httpClient,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);

		return this.dataTransferObjectService.transactions(transactions, {
			prev: undefined,
			self: undefined,
			next: undefined,
			last: undefined,
		});
	}

	public override async wallet(id: string): Promise<Contracts.WalletData> {
		const { usedSpendAddresses, usedChangeAddresses } = await usedAddressesForAccount(
			this.configRepository,
			this.httpClient,
			id,
		);

		const balance = await fetchUtxosAggregate(
			this.configRepository,
			this.httpClient,
			Array.from(usedSpendAddresses.values()).concat(Array.from(usedChangeAddresses.values())),
		);

		return this.dataTransferObjectService.wallet({
			id,
			balance,
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
			try {
				await submitTransaction(this.configRepository, this.httpClient, transaction.toBroadcast());

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}
}
