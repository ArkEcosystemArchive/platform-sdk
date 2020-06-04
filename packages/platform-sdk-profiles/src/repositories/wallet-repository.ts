import { Coins } from "@arkecosystem/platform-sdk";
// import { ADA } from "@arkecosystem/platform-sdk-ada";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { ATOM } from "@arkecosystem/platform-sdk-atom";
import { BTC } from "@arkecosystem/platform-sdk-btc";
import { EOS } from "@arkecosystem/platform-sdk-eos";
import { ETH } from "@arkecosystem/platform-sdk-eth";
import { LSK } from "@arkecosystem/platform-sdk-lsk";
import { NEO } from "@arkecosystem/platform-sdk-neo";
import { TRX } from "@arkecosystem/platform-sdk-trx";
import { XLM } from "@arkecosystem/platform-sdk-xlm";
import { XMR } from "@arkecosystem/platform-sdk-xmr";
import { XRP } from "@arkecosystem/platform-sdk-xrp";

import { Wallet } from "../wallet";
import { DataRepository } from "./data-repository";

export class WalletRepository {
	#data: DataRepository;

	/**
	 * @TODO
	 *
	 * Think about how to remove this because we don't want this package to know what coins are
	 * but we need to map a string like ARK to the concrete implementation when restoring a coin from
	 * the storage where the coin and network are stored as strings.
	 */
	readonly #coinMap = {
		// Cardano,
		ARK,
		ATOM,
		BTC,
		EOS,
		ETH,
		LSK,
		NEO,
		TRX,
		XLM,
		XMR,
		XRP,
	};

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
		const wallet: Wallet = new Wallet();

		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		return this.storeWallet(wallet);
	}

	public async createFromObject({ coin, coinConfig, network, address }): Promise<Wallet> {
		const wallet: Wallet = new Wallet();

		await wallet.setCoin(this.#coinMap[coin], network);
		await wallet.setAddress(address);

		for (const [key, value] of Object.entries(coinConfig)) {
			wallet.coin().config().set(key, value);
		}

		return this.storeWallet(wallet);
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

	private storeWallet(wallet: Wallet): Wallet {
		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.#data.set(wallet.address(), wallet);

		return wallet;
	}
}
