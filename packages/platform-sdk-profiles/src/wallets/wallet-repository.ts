import { Coins } from "@arkecosystem/platform-sdk";

import { Storage } from "../contracts";
import { Wallet } from "./wallet";

export class WalletRepository {
	#wallets: Wallet[] = [];
	readonly #storage: Storage;

	public constructor(storage: Storage, wallets: Wallet[]) {
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
		const wallet: Wallet = await Wallet.fromMnemonic({
			...input,
			storage: this.#storage,
		});

		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.push(wallet);

		return wallet;
	}
}
