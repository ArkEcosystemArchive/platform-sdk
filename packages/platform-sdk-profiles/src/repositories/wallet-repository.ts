import { Coins } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { v4 as uuidv4 } from "uuid";

import { container } from "../container";
import { Identifiers } from "../contracts";
import { Wallet } from "../wallet";
import { DataRepository } from "./data-repository";

export class WalletRepository {
	#data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
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
		const id: string = uuidv4();
		const wallet: Wallet = new Wallet(id);

		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		return this.storeWallet(id, wallet);
	}

	public async createRandom(coin: Coins.CoinSpec, network: string): Promise<{ mnemonic: string; wallet: Wallet }> {
		const mnemonic: string = BIP39.generate();

		return { mnemonic, wallet: await this.create(mnemonic, coin, network) };
	}

	public async createFromObject({ id, coin, coinConfig, network, address }): Promise<Wallet> {
		const wallet: Wallet = new Wallet(id);

		await wallet.setCoin(container.get<any>(Identifiers.Coins)[coin], network);
		await wallet.setAddress(address);

		for (const [key, value] of Object.entries(coinConfig)) {
			wallet.coin().config().set(key, value);
		}

		return this.storeWallet(wallet.id(), wallet);
	}

	public findById(id: string): Wallet {
		const wallet: Wallet | undefined = this.#data.get(id);

		if (!wallet) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}

		return wallet;
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

	public forget(id: string): void {
		this.#data.forget(id);
	}

	public flush(): void {
		this.#data.flush();
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, wallet] of Object.entries(this.#data.all())) {
			result[id] = wallet.toObject();
		}

		return result;
	}

	private storeWallet(id: string, wallet: Wallet): Wallet {
		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.#data.set(id, wallet);

		return wallet;
	}
}
