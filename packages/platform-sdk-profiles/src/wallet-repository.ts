import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { v4 as uuidv4 } from "uuid";

import { Storage } from "./contracts";
import { Data } from "./data";
import { Wallet } from "./wallet";

export class WalletRepository {
	#wallets: Wallet[] = [];

	readonly #data: Data;
	readonly #httpClient: Contracts.HttpClient;
	readonly #storage: Storage;

	public constructor({ data, httpClient, storage, wallets }) {
		this.#data = data;
		this.#httpClient = httpClient;
		this.#storage = storage;
		this.#wallets = wallets;
	}

	public all(): Wallet[] {
		return this.#wallets;
	}

	public async create(wallet: Wallet): Promise<Wallet> {
		this.#wallets.push(wallet);

		await this.persist();

		return wallet;
	}

	public find(id: string): Wallet {
		return this.#wallets[this.findIndex(id)];
	}

	// public async update(id: string, data: object): Promise<void> {
	// 	const index: number = this.findIndex(id);

	// 	this.#wallets[index] = {};

	// 	await this.persist();
	// }

	public async destroy(id: string): Promise<void> {
		this.#wallets.splice(this.findIndex(id), 1);

		await this.persist();
	}

	public findByAddress(address: string): Wallet | undefined {
		return this.#wallets.find((wallet: Wallet) => wallet.address() === address);
	}

	public findByPublicKey(publicKey: string): Wallet | undefined {
		return this.#wallets.find((wallet: Wallet) => wallet.publicKey() === publicKey);
	}

	public findByCoin(coin: string): Wallet[] {
		return this.#wallets.filter((wallet: Wallet) => wallet.coin().manifest().get<string>("name") === coin);
	}

	public async flush(): Promise<void> {
		this.#wallets = [];

		await this.persist();
	}

	public async createFromPassphrase(input: {
		mnemonic: string;
		coin: Coins.CoinSpec;
		network: string;
	}): Promise<Wallet> {
		const wallet: Wallet = await Wallet.fromMnemonic({
			id: uuidv4(),
			...input,
			httpClient: this.#httpClient,
			storage: this.#storage,
		});

		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		await this.create(wallet);

		return wallet;
	}

	private async persist(): Promise<void> {
		await this.#data.set("wallets", this.#wallets);
	}

	private findIndex(id: string): number {
		const index: number = this.#wallets.findIndex((wallet: Wallet) => wallet.address() === id);

		if (index === -1) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}

		return index;
	}
}
