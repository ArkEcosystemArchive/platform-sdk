import { IReadWriteWallet } from "./contracts";
import { IWalletGate } from "./contracts";

export class WalletGate implements IWalletGate {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletGate.allows} */
	public allows(feature: string): boolean {
		return this.#wallet.network().allows(feature);
	}

	/** {@inheritDoc IWalletGate.denies} */
	public denies(feature: string): boolean {
		return this.#wallet.network().denies(feature);
	}

	/** {@inheritDoc IWalletGate.any} */
	public any(features: string[]): boolean {
		for (const feature of features) {
			if (this.allows(feature)) {
				return true;
			}
		}

		return false;
	}

	/** {@inheritDoc IWalletGate.all} */
	public all(features: string[]): boolean {
		for (const feature of features) {
			if (this.denies(feature)) {
				return false;
			}
		}

		return true;
	}
}
