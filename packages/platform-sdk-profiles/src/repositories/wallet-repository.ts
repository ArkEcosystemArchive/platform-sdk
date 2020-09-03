import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { sortBy, sortByDesc } from "@arkecosystem/utils";
import { v4 as uuidv4 } from "uuid";

import { Profile } from "../profiles/profile";
import { Wallet } from "../wallets/wallet";
import { ReadWriteWallet } from "../wallets/wallet.models";
import { DataRepository } from "./data-repository";

export class WalletRepository {
	#data: DataRepository;
	#profile: Profile;

	public constructor(profile: Profile) {
		this.#data = new DataRepository();
		this.#profile = profile;
	}

	public all(): Record<string, ReadWriteWallet> {
		return this.#data.all() as Record<string, ReadWriteWallet>;
	}

	public first(): ReadWriteWallet {
		return this.#data.first();
	}

	public last(): ReadWriteWallet {
		return this.#data.last();
	}

	public allByCoin(): Record<string, Record<string, ReadWriteWallet>> {
		const result = {};

		for (const [id, wallet] of Object.entries(this.all())) {
			const coin: string | undefined = wallet.currency();

			if (coin) {
				if (!result[coin]) {
					result[coin] = {};
				}

				result[coin][id] = wallet;
			}
		}

		return result;
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): ReadWriteWallet[] {
		return this.#data.values();
	}

	public async importByMnemonic(mnemonic: string, coin: string, network: string): Promise<ReadWriteWallet> {
		const id: string = uuidv4();
		const wallet = new Wallet(id, this.#profile);

		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		return this.storeWallet(id, wallet);
	}

	public async importByAddress(address: string, coin: string, network: string): Promise<ReadWriteWallet> {
		const id: string = uuidv4();
		const wallet = new Wallet(id, this.#profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(address);

		return this.storeWallet(id, wallet);
	}

	public async generate(coin: string, network: string): Promise<{ mnemonic: string; wallet: ReadWriteWallet }> {
		const mnemonic: string = BIP39.generate();

		return { mnemonic, wallet: await this.importByMnemonic(mnemonic, coin, network) };
	}

	public async restore({ id, coin, coinConfig, network, address, data, settings }): Promise<ReadWriteWallet> {
		const wallet = new Wallet(id, this.#profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(address);

		for (const [key, value] of Object.entries(coinConfig)) {
			wallet.coin().config().set(key, value);
		}

		wallet.data().fill(data);

		wallet.settings().fill(settings);

		return this.storeWallet(wallet.id(), wallet as ReadWriteWallet);
	}

	public findById(id: string): ReadWriteWallet {
		const wallet: ReadWriteWallet | undefined = this.#data.get(id);

		if (!wallet) {
			throw new Error(`Failed to find a wallet for [${id}].`);
		}

		return wallet;
	}

	public findByAddress(address: string): ReadWriteWallet | undefined {
		return this.values().find((wallet: ReadWriteWallet) => wallet.address() === address);
	}

	public findByPublicKey(publicKey: string): ReadWriteWallet | undefined {
		return this.values().find((wallet: ReadWriteWallet) => wallet.publicKey() === publicKey);
	}

	public findByCoin(coin: string): ReadWriteWallet[] {
		return this.values().filter((wallet: ReadWriteWallet) => wallet.coin().manifest().get<string>("name") === coin);
	}

	public findByCoinWithNetwork(coin: string, network: string): ReadWriteWallet[] {
		return this.values().filter(
			(wallet: ReadWriteWallet) => wallet.coinId() === coin && wallet.networkId() === network,
		);
	}

	public update(id: string, data: { alias?: string; }): void {
		const result = this.findById(id);

		if (data.alias) {
			const wallets: ReadWriteWallet[] = this.values();

			for (const wallet of wallets) {
				if (wallet.id() === id || !wallet.alias()) {
					continue;
				}

				if (wallet.alias()!.toLowerCase() === data.alias.toLowerCase()) {
					throw new Error(`The wallet with alias [${data.alias}] already exists.`);
				}
			}

			result.setAlias(data.alias);
		}

		this.#data.set(id, result);
	}

	public has(id: string): boolean {
		return this.#data.has(id);
	}

	public forget(id: string): void {
		this.#data.forget(id);
	}

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.keys().length;
	}

	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};

		for (const [id, wallet] of Object.entries(this.#data.all())) {
			result[id] = wallet.toObject();
		}

		return result;
	}

	public sortBy(column: string, direction: "asc" | "desc" = "asc"): ReadWriteWallet[] {
		// TODO: sort by balance as fiat (BigInt)

		const sortFunction = (wallet: ReadWriteWallet) => {
			if (column === "coin") {
				return wallet.currency();
			}

			if (column === "type") {
				return wallet.isStarred();
			}

			if (column === "balance") {
				return wallet.balance().toFixed();
			}

			return wallet[column]();
		};

		if (direction === "asc") {
			return sortBy(this.values(), sortFunction);
		}

		return sortByDesc(this.values(), sortFunction);
	}

	private storeWallet(id: string, wallet: ReadWriteWallet): ReadWriteWallet {
		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.#data.set(id, wallet);

		return wallet;
	}
}
