import { Coins } from "@arkecosystem/platform-sdk";

import { Wallet } from "../wallet";
import { DataRepository } from "./data-repository";

export class WalletRepository {
	#data: DataRepository;

	public constructor() {
		this.#data = new DataRepository("profile", "wallet");
	}

	public all(): Record<string, Wallet> {
		return this.#data.all() as Record<string, Wallet>;
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Wallet[] {
		return this.#data.values();
	}

	public async create(mnemonic: string, coin: Coins.CoinSpec, network: string): Promise<Wallet> {
		const wallet: Wallet = new Wallet();
		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.#data.set(wallet.address(), wallet);

		return wallet;
	}

	public find(id: string): Wallet {
		const wallet: Wallet | undefined = this.#data.get(id);

		if (!wallet) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}

		return wallet;
	}

	public async destroy(id: string): Promise<void> {
		this.#data.forget(id);
	}

	public findByAddress(address: string): Wallet | undefined {
		return this.values().find((wallet: Wallet) => wallet.address() === address);
	}

	public findByPublicKey(publicKey: string): Wallet | undefined {
		return this.values().find((wallet: Wallet) => wallet.publicKey() === publicKey);
	}

	public findByCoin(coin: string): Wallet[] {
		return this.values().filter((wallet: Wallet) => wallet.coin().manifest().get<string>("name") === coin);
	}

	public async flush(): Promise<void> {
		this.#data.flush();
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, wallet] of Object.entries(this.#data.all())) {
			result[id] = wallet.toObject();
		}

		return result;
	}
}
