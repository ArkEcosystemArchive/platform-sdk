import { Wallet } from "./wallet";

export class WalletRepository {
	readonly #wallets: Wallet[] = [];

	constructor(data: any) {
		this.#wallets = data.wallets;
	}

	public all(): Wallet[] {
		return this.#wallets;
	}

	public findByAddress(address: string): Wallet | undefined {
		return this.#wallets.find((wallet: Wallet) => wallet.address() === address);
	}

	public findByPublicKey(publicKey: string): Wallet | undefined {
		return this.#wallets.find((wallet: Wallet) => wallet.publicKey() === publicKey);
	}

	public findByCoin(coin: string): Wallet | undefined {
		return this.#wallets.find((wallet: Wallet) => wallet.coin().config.name === coin);
	}
}
