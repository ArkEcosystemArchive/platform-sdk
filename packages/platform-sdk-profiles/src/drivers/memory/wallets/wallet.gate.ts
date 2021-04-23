import { IReadWriteWallet } from "../../../contracts";
import { IWalletGate } from "../../../contracts/wallets/wallet.gate";

export class WalletGate implements IWalletGate {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	public canVote(): boolean {
		return this.#wallet.voting().available() > 0;
	}

	public can(feature: string): boolean {
		return this.#wallet.network().can(feature);
	}

	public canAny(features: string[]): boolean {
		for (const feature of features) {
			if (this.can(feature)) {
				return true;
			}
		}

		return false;
	}

	public canAll(features: string[]): boolean {
		for (const feature of features) {
			if (this.cannot(feature)) {
				return false;
			}
		}

		return true;
	}

	public cannot(feature: string): boolean {
		return this.#wallet.network().cannot(feature);
	}
}
