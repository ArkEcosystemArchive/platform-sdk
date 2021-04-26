import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionData } from "../../../../dto/transaction";
import { transformTransactionData, transformTransactionDataCollection } from "../../../../dto/transaction-mapper";
import { IReadWriteWallet } from "../../../../contracts";
import { ExtendedTransactionDataCollection } from "../../../../dto";
import { ITransactionIndex } from "../../../../contracts/wallets/services/transaction-index";

export class TransactionIndex implements ITransactionIndex {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc ITransactionIndex.all} */
	public async all(query: Contracts.ClientTransactionsInput = {}): Promise<ExtendedTransactionDataCollection> {
		return this.fetch({ ...query, addresses: [this.#wallet.address()] });
	}

	/** {@inheritDoc ITransactionIndex.sent} */
	public async sent(query: Contracts.ClientTransactionsInput = {}): Promise<ExtendedTransactionDataCollection> {
		return this.fetch({ ...query, senderId: this.#wallet.address() });
	}

	/** {@inheritDoc ITransactionIndex.received} */
	public async received(query: Contracts.ClientTransactionsInput = {}): Promise<ExtendedTransactionDataCollection> {
		return this.fetch({ ...query, recipientId: this.#wallet.address() });
	}

	/** {@inheritDoc ITransactionIndex.findById} */
	public async findById(id: string): Promise<ExtendedTransactionData> {
		return transformTransactionData(
			this.#wallet,
			await this.#wallet.getAttributes().get<Coins.Coin>("coin").client().transaction(id),
		);
	}

	/** {@inheritDoc ITransactionIndex.findByIds} */
	public async findByIds(ids: string[]): Promise<ExtendedTransactionData[]> {
		return Promise.all(ids.map((id: string) => this.findById(id)));
	}

	private async fetch(query: Contracts.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection> {
		const result = await this.#wallet.getAttributes().get<Coins.Coin>("coin").client().transactions(query);

		for (const transaction of result.items()) {
			transaction.setMeta("address", this.#wallet.address());
			transaction.setMeta("publicKey", this.#wallet.publicKey());
		}

		return transformTransactionDataCollection(this.#wallet, result);
	}
}
