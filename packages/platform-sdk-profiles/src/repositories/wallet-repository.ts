import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { sortBy, sortByDesc } from "@arkecosystem/utils";
import { v4 as uuidv4 } from "uuid";

import { Profile } from "../profiles/profile";
import { Wallet } from "../wallets/wallet";
import { DataRepository } from "./data-repository";

export class WalletRepository {
	#data: DataRepository;
	#profile: Profile;

	public constructor(profile: Profile) {
		this.#data = new DataRepository();
		this.#profile = profile;
	}

	public all(): Record<string, Wallet> {
		return this.#data.all() as Record<string, Wallet>;
	}

	public allByCoin(): Record<string, Record<string, Wallet>> {
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

	public values(): Wallet[] {
		return this.#data.values();
	}

	public async importByMnemonic(mnemonic: string, coin: string, network: string): Promise<Wallet> {
		const id: string = uuidv4();
		const wallet: Wallet = new Wallet(id, this.#profile);

		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		return this.storeWallet(id, wallet);
	}

	public async importByAddress(address: string, coin: string, network: string): Promise<Wallet> {
		const id: string = uuidv4();
		const wallet: Wallet = new Wallet(id, this.#profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(address);

		return this.storeWallet(id, wallet);
	}

	public async generate(coin: string, network: string): Promise<{ mnemonic: string; wallet: Wallet }> {
		const mnemonic: string = BIP39.generate();

		return { mnemonic, wallet: await this.importByMnemonic(mnemonic, coin, network) };
	}

	public async restore({ id, coin, coinConfig, network, address, data, settings }): Promise<Wallet> {
		const wallet: Wallet = new Wallet(id, this.#profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(address);

		for (const [key, value] of Object.entries(coinConfig)) {
			wallet.coin().config().set(key, value);
		}

		wallet.data().fill(data);

		wallet.settings().fill(settings);

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

	public findByCoinWithNetwork(coin: string, network: string): Wallet[] {
		return this.values().filter(
			(wallet: Wallet) =>
				wallet.coin().manifest().get<string>("name") === coin && wallet.network().id === network,
		);
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

	public sortBy(column: string, direction: "asc" | "desc" = "asc"): Wallet[] {
		// TODO: sort by balance as fiat (BigInt)

		const sortFunction = (wallet: Wallet) => {
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

	private storeWallet(id: string, wallet: Wallet): Wallet {
		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.#data.set(id, wallet);

		return wallet;
	}
}
