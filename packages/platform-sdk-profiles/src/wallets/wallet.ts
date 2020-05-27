import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Storage } from "../contracts";
import { Data } from "../data";
import { Settings } from "../settings";

export class Wallet {
	readonly #coin: Coins.Coin;
	readonly #wallet: Contracts.WalletData;
	readonly #data: Data;
	readonly #settings: Settings;

	private constructor(input: { coin: Coins.Coin; storage: Storage; wallet: Contracts.WalletData }) {
		this.#coin = input.coin;
		this.#wallet = input.wallet;
		this.#data = new Data(input.storage, `wallets.${this.address()}`);
		this.#settings = new Settings(input.storage, `wallets.${this.address()}`);
	}

	public static async fromPassphrase(input: {
		passphrase: string;
		coin: Coins.CoinSpec;
		network: string;
		httpClient: Contracts.HttpClient;
		storage: Storage;
	}): Promise<Wallet> {
		const coin = await Coins.CoinFactory.make(input.coin, { network: input.network, httpClient: input.httpClient });

		const address: string = await coin.identity().address().fromPassphrase(input.passphrase);

		return new Wallet({ coin, storage: input.storage, wallet: await coin.client().wallet(address) });
	}

	public coin(): Coins.Coin {
		return this.#coin;
	}

	public network(): string {
		return this.#coin.network().id;
	}

	public address(): string {
		return this.#wallet.address();
	}

	public publicKey(): string | undefined {
		return this.#wallet.publicKey();
	}

	public balance(): BigNumber {
		return this.#wallet.balance();
	}

	public nonce(): BigNumber {
		return this.#wallet.nonce();
	}

	public data(): Data {
		return this.#data;
	}

	public settings(): Settings {
		return this.#settings;
	}

	/**
	 * All methods below this line are convenience methods that serve as proxies to the underlying coin implementation.
	 *
	 * The purpose of these methods is to reduce duplication and prevent consumers from implementing
	 * convoluted custom implementations that deviate from how things should be used.
	 *
	 * Any changes in how things need to be handled by consumers should be made in this package!
	 */

	public transactions(): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().transactions({ address: this.address() });
	}

	public sentTransactions(): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().transactions({ senderId: this.address() });
	}

	public receivedTransactions(): Promise<Contracts.CollectionResponse<Coins.TransactionDataCollection>> {
		return this.#coin.client().transactions({ recipientId: this.address() });
	}
}
