import { Coins, Contracts, Utils } from "@arkecosystem/platform-sdk";

export class Wallet {
	readonly #coin: Coins.Coin;
	readonly #data: Contracts.WalletData;

	private constructor(coin: Coins.Coin, wallet: Contracts.WalletData) {
		this.#coin = coin;
		this.#data = wallet;
	}

	public static async fromPassphrase(passphrase: string, spec: Coins.CoinSpec, network: string): Promise<Wallet> {
		const coin = await Coins.CoinFactory.make(spec, { network });

		const address: string = await coin.identity().address().fromPassphrase(passphrase);

		const wallet: Contracts.WalletData = await coin.client().wallet(address);

		return new Wallet(coin, wallet);
	}

	public coin(): string {
		return this.#coin.manifest().get<string>("name")!;
	}

	public network(): string {
		return this.#coin.network().id;
	}

	public address(): string {
		return this.#data.address();
	}

	public publicKey(): string | undefined {
		return this.#data.publicKey();
	}

	public balance(): Utils.BigNumber {
		return this.#data.balance();
	}

	public nonce(): Utils.BigNumber {
		return this.#data.nonce();
	}
}
