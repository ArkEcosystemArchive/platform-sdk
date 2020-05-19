import { Coins, Contracts, Utils } from "@arkecosystem/platform-sdk";

export class Wallet {
	readonly #coin: Coins.Coin;
	readonly #address: string;
	readonly #publicKey: string;
	#balance: Utils.BigNumber;
	#nonce: Utils.BigNumber;

	private constructor(data: any) {
		this.#coin = data.coin;
		this.#address = data.address;
		this.#publicKey = data.publicKey;
		this.#balance = data.balance;
		this.#nonce = data.nonce;
	}

	public static async make(passphrase: string, coin: Coins.CoinSpec, network: string): Promise<Wallet> {
		const adapter = await Coins.CoinFactory.make(coin, { network });

		const address = await adapter.identity().address().fromPassphrase(passphrase);
		const publicKey = await adapter.identity().publicKey().fromPassphrase(passphrase);

		const { balance, nonce } = await adapter.client().wallet(address);

		return new Wallet({ coin: adapter, address, publicKey, balance, nonce });
	}

	public coin(): Coins.Coin {
		return this.#coin;
	}

	public address(): string {
		return this.#address;
	}

	public publicKey(): string {
		return this.#publicKey;
	}

	public balance(format?: boolean): Utils.BigNumber | string {
		if (format) {
			// TODO:
			// @ts-ignore
			return this.#balance.div(1e8).toFixed();
		}

		return this.#balance;
	}

	public async transfer(data: any): Promise<Contracts.BroadcastResponse> {
		const transaction = await this.#coin.transaction().transfer({
			sign: {
				passphrase: data.passphrase,
			},
			data: {
				amount: "1",
				to: data.recipient,
			},
		});

		return this.#coin.client().broadcast([transaction]);
	}
}
