import { Wallet as MemoryWallet } from "../../memory/wallets/wallet";

import { spawn, Worker, Thread } from "threads";

// helpers.ts
const spawnWorker = async <T>(file: string, callback: Function): Promise<T> => {
	const worker = await spawn(new Worker(file));
	const result: T = await callback(worker);

	Thread.terminate(worker);

	return result;
}

// WorkerWallet
export class Wallet extends MemoryWallet {
	public async wif(password: string): Promise<string> {
		return spawnWorker("./wallet.worker", async ({ worker }) => worker.decryptWIF(this, password));
	}
}
