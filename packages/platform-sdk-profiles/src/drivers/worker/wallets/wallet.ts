import { WalletData } from "../../../contracts";
import { Wallet as MemoryWallet } from "../../memory/wallets/wallet";

import { spawn, Worker, Thread } from "threads";

export class Wallet extends MemoryWallet {
	/**
	 * {@inheritDoc MemoryWallet.wif}
	 */
	public async wif(password: string): Promise<string> {
		const encryptedKey: string | undefined = this.data().get(WalletData.Bip38EncryptedKey);

		if (encryptedKey === undefined) {
			throw new Error("This wallet does not use BIP38 encryption.");
		}

		// Instatiate and get worker instance. Depending on the architecture,
		// workers can be created once on class instatiation or on demand.
		// Workers can be functions or entire modules.
		// See https://threads.js.org/usage
		const walletWorker = await spawn(new Worker("./wallet.worker"));

		// Run bip38 decrypt function in worker and wait for results
		const decrypted = await walletWorker.decrypt(encryptedKey, password);

		// Worker is no longer necessary. Terminate
		Thread.terminate(walletWorker);

		return this.coin().identity().wif().fromPrivateKey(decrypted.privateKey.toString("hex"));
	}
}
