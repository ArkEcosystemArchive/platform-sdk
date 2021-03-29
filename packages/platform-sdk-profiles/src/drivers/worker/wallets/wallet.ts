import { Wallet as Memory } from "../../memory/wallets/wallet";

import { spawnWorker } from "../../shared/workers";

export class Wallet extends Memory {
	public async wif(password: string): Promise<string> {
		return spawnWorker(
			"./wallet.worker",
			async ({ worker }) => worker.decryptWIF(this, password),
		);
	}
}
