import { WalletData } from "../../contracts";

export class WalletDataCollection {
	readonly #wallets: WalletData[];

	public constructor(wallets: WalletData[]) {
		this.#wallets = wallets;
	}

	public all(): WalletData[] {
		return this.#wallets;
	}

	public findByAddress(address: string): WalletData | undefined {
		return this.find("address", address);
	}

	public findByPublicKey(publicKey: string): WalletData | undefined {
		return this.find("publicKey", publicKey);
	}

	private find(key: string, value: string): WalletData | undefined {
		return this.#wallets.find((wallet: WalletData) => wallet[key]() === value);
	}
}
