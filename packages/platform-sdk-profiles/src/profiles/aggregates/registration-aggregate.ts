import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class RegistrationAggregate {
	// @TODO: add typehint
	readonly #wallet;

	// @TODO: add typehint
	public constructor(wallet) {
		this.#wallet = wallet;
	}

	public async businesses(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "business",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async delegates(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "delegate",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async corePlugins(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "corePlugin",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async desktopWalletPlugins(
		query: Contracts.ClientPagination = {},
	): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "desktopWalletPlugin",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}
}
