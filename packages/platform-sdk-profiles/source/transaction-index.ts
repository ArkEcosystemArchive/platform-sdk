import { Coins, Services } from "@arkecosystem/platform-sdk";

import { ExtendedConfirmedTransactionData } from "./transaction.dto";
import { transformTransactionData, transformConfirmedTransactionDataCollection } from "./transaction.mapper";
import { IReadWriteWallet } from "./contracts";
import { ExtendedConfirmedTransactionDataCollection } from "./transaction.collection";
import { ITransactionIndex } from "./contracts";

export class TransactionIndex implements ITransactionIndex {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc ITransactionIndex.all} */
	public async all(
		query: Services.ClientTransactionsInput = {},
	): Promise<ExtendedConfirmedTransactionDataCollection> {
		return this.#fetch({ ...query, addresses: [this.#wallet.address()] });
	}

	/** {@inheritDoc ITransactionIndex.sent} */
	public async sent(
		query: Services.ClientTransactionsInput = {},
	): Promise<ExtendedConfirmedTransactionDataCollection> {
		return this.#fetch({ ...query, senderId: this.#wallet.address() });
	}

	/** {@inheritDoc ITransactionIndex.received} */
	public async received(
		query: Services.ClientTransactionsInput = {},
	): Promise<ExtendedConfirmedTransactionDataCollection> {
		return this.#fetch({ ...query, recipientId: this.#wallet.address() });
	}

	/** {@inheritDoc ITransactionIndex.findById} */
	public async findById(id: string): Promise<ExtendedConfirmedTransactionData> {
		return transformTransactionData(
			this.#wallet,
			await this.#wallet.getAttributes().get<Coins.Coin>("coin").client().transaction(id),
		);
	}

	/** {@inheritDoc ITransactionIndex.findByIds} */
	public async findByIds(ids: string[]): Promise<ExtendedConfirmedTransactionData[]> {
		return Promise.all(ids.map((id: string) => this.findById(id)));
	}

	async #fetch(query: Services.ClientTransactionsInput): Promise<ExtendedConfirmedTransactionDataCollection> {
		const result = await this.#wallet.getAttributes().get<Coins.Coin>("coin").client().transactions(query);

		for (const transaction of result.items()) {
			transaction.setMeta("address", this.#wallet.address());
			transaction.setMeta("publicKey", this.#wallet.publicKey());
		}

		return transformConfirmedTransactionDataCollection(this.#wallet, result);
	}
}
