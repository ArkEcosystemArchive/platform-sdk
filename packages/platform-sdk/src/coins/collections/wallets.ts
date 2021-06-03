import { WalletData } from "../../contracts";
import { Paginator } from "./paginator";

export class WalletDataCollection extends Paginator<WalletData> {
	public findByAddress(address: string): WalletData | undefined {
		return this.#find("address", address);
	}

	public findByPublicKey(publicKey: string): WalletData | undefined {
		return this.#find("publicKey", publicKey);
	}

	public findByUsername(username: string): WalletData | undefined {
		return this.#find("username", username);
	}

	#find(key: string, value: string): WalletData | undefined {
		return this.items().find((wallet: WalletData) => wallet[key]() === value);
	}
}
