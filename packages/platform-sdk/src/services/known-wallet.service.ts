/* istanbul ignore file */

import { KnownWallet, KnownWalletService } from "./known-wallet.contract";

export abstract class AbstractKnownWalletService implements KnownWalletService {
	public async __destruct(): Promise<void> {}

	public async all(): Promise<KnownWallet[]> {
		return [];
	}
}
