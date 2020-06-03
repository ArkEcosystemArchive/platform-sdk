import { Coins } from "@arkecosystem/platform-sdk";
import { injectable } from "inversify";

import { container } from "../container";
import { Wallet } from "../wallet";

@injectable()
export class WalletRepository {
	#wallets: Wallet[] = [];

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

	public async createFromMnemonic(mnemonic: string, coin: Coins.CoinSpec, network: string): Promise<Wallet> {
		const wallet: Wallet = container.resolve(Wallet);

		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		if (this.findByAddress(wallet.address())) {
			throw new Error(`The wallet [${wallet.address()}] already exists.`);
		}

		this.push(wallet);

		return wallet;
	}
}
