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
		storage: Storage;
	}): Promise<Wallet> {
		const coin = await Coins.CoinFactory.make(input.coin, { network: input.network });

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
