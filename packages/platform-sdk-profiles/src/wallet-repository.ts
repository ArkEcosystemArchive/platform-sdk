import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { Storage } from "./contracts";
import { Wallet } from "./wallet";

export class WalletRepository {
	#wallets: Wallet[] = [];

	readonly #httpClient: Contracts.HttpClient;
	readonly #storage: Storage;

	public constructor({ httpClient, storage, wallets }) {
		this.#httpClient = httpClient;
		this.#storage = storage;
		this.#wallets = wallets;
	}

	public all(): Wallet[] {
		return this.#wallets;
	}

	public push(wallet: Wallet): void {
		this.#wallets.push(wallet);
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

	public flush(): void {
		this.#wallets = [];
	}

	public async createFromPassphrase(input: {
		passphrase: string;
		coin: Coins.CoinSpec;
		network: string;
	}): Promise<Wallet> {
		const wallet: Wallet = await Wallet.fromPassphrase({
			...input,
			httpClient: this.#httpClient,
			storage: this.#storage,
		});

		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.push(wallet);

		return wallet;
	}
}
