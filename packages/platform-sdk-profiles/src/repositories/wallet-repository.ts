import { Coins } from "@arkecosystem/platform-sdk";
import { inject, injectable } from "inversify";

import { container } from "../container";
import { Wallet } from "../wallet";
import { Identifiers } from "./contracts";
import { Data } from "./data-repository";

@injectable()
export class WalletRepository {
	@inject(Identifiers.Data)
	private dataRepository!: Data;

	#wallets: Wallet[] = [];

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

	public async createFromMnemonic(mnemonic: string, coin: Coins.CoinSpec, network: string): Promise<Wallet> {
		const wallet: Wallet = container.resolve(Wallet);

		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		await this.create(wallet);

		return wallet;
	}

	private async persist(): Promise<void> {
		await this.dataRepository.set("wallets", this.#wallets);
	}

	private findIndex(id: string): number {
		const index: number = this.#wallets.findIndex((wallet: Wallet) => wallet.address() === id);

		if (index === -1) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}

		return index;
	}
}
