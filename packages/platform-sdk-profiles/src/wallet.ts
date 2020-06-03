import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { inject, injectable, postConstruct } from "inversify";

import { Avatar } from "./avatar";
import { Identifiers, Storage } from "./contracts";
import { Data } from "./repositories/data-repository";
import { Settings } from "./repositories/setting-repository";

@injectable()
export class Wallet {
	#coin!: Coins.Coin;
	#wallet!: Contracts.WalletData;
	#avatar!: string;

	@inject(Identifiers.Data)
	private readonly dataRepo!: Data;

	@inject(Identifiers.HttpClient)
	private readonly httpClient!: Contracts.HttpClient;

	@inject(Identifiers.Settings)
	private settingsRepository!: Settings;

	@inject(Identifiers.Storage)
	private readonly storage!: Storage;

	/**
	 * These methods allow to switch out the underlying implementation of certain things like the coin.
	 */

	public async setCoin(coin: Coins.CoinSpec, network: string): Promise<Wallet> {
		this.#coin = await Coins.CoinFactory.make(coin, {
			network,
			httpClient: this.httpClient,
		});

		return this;
	}

	public async setIdentity(mnemonic: string): Promise<Wallet> {
		this.#wallet = await this.#coin.client().wallet(await this.#coin.identity().address().fromMnemonic(mnemonic));

		this.settingsRepository = this.settings().scope(`wallets.${this.address()}`, "wallet");

		await this.setAvatar(Avatar.make(this.address()));

		return this;
	}

	public async setAvatar(value: string): Promise<Wallet> {
		this.#avatar = value;

		await this.settings().set("avatar", value);

		return this;
	}

	/**
	 * These methods serve as getters to the underlying data and dependencies.
	 */

	public coin(): Coins.Coin {
		return this.#coin;
	}

	public network(): string {
		return this.#coin.network().id;
	}

	public avatar(): string {
		return this.#avatar;
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
		return this.dataRepo;
	}

	public settings(): Settings {
		return this.settingsRepository;
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
