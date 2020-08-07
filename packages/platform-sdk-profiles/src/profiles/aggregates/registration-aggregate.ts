import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class RegistrationAggregate {
	// @TODO: add typehint
	readonly #wallet;

	// @TODO: add typehint
	public constructor(wallet) {
		this.#wallet = wallet;
	}

	public async all(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "all",
			entityAction: "register",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async businesses(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "business",
			entityAction: "register",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async delegates(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "delegate",
			entityAction: "register",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async plugins(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "plugin",
			entityAction: "register",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async corePlugins(query: Contracts.ClientPagination = {}): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "corePlugin",
			entityAction: "register",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}

	public async desktopWalletPlugins(
		query: Contracts.ClientPagination = {},
	): Promise<Coins.TransactionDataCollection> {
		return this.#wallet.client().transactions({
			...query,
			entityType: "desktopWalletPlugin",
			entityAction: "register",
			senderPublicKey: this.#wallet.publicKey(),
		});
	}
}
