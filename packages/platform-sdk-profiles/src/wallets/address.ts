import { Coins } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { ReadWriteWallet } from "./wallet.models";

export class Address {
	readonly #id: string;
	readonly #primaryKey: string;
	readonly #wallet: ReadWriteWallet;
	#balance: BigNumber | undefined;
	#transactions: Coins.TransactionDataCollection | undefined;

	public constructor({ id, address, wallet }: { id: string; address: string; wallet: ReadWriteWallet }) {
		this.#id = id;
		this.#primaryKey = address;
		this.#wallet = wallet;
	}

	public async sync(): Promise<void> {
		console.log(this.#primaryKey);

		const [wallet, transactions] = await Promise.all([
			await this.#wallet.client().wallet(this.#primaryKey),
			await this.#wallet.client().transactions({ walletId: this.#primaryKey }),
		]);

		this.#balance = wallet.balance();
		this.#transactions = transactions;
	}

	public balance(): BigNumber {
		if (this.#balance === undefined) {
			throw new Error("This address has not been synchronized yet. Please call [sync] before using it.");
		}

		return this.#balance;
	}

	public transactions(): Coins.TransactionDataCollection {
		if (this.#transactions === undefined) {
			throw new Error("This address has not been synchronized yet. Please call [sync] before using it.");
		}

		return this.#transactions;
	}
}
