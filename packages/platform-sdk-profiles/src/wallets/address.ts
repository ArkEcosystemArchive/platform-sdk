import { Coins } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { ReadWriteWallet } from "./wallet.models";

export class Address {
	readonly #id: string;
	readonly #address: string;
	readonly #wallet: ReadWriteWallet;
	#balance: BigNumber | undefined;
	#transactions: Coins.TransactionDataCollection | undefined;

	public constructor({ id, address, wallet }: { id: string; address: string; wallet: ReadWriteWallet; }) {
		this.#id = id;
		this.#address = address;
		this.#wallet = wallet;
	}

	public async sync(): Promise<void> {
		const [wallet, transactions] = await Promise.all([
			await this.#wallet.client().wallet(this.#address),
			await this.#wallet.client().transactions({ address: this.#address }),
		]);

		this.#balance = wallet.balance();
		this.#transactions = transactions;
	}

	public balance(): BigNumber {
		if (this.#balance === undefined) {
			throw new Error("This address has not been synchronized yet. Please call [sync] before using it.");
		}

		return BigNumber.make(this.#balance);
	}

	public transactions(): Coins.TransactionDataCollection {
		if (this.#transactions === undefined) {
			throw new Error("This address has not been synchronized yet. Please call [sync] before using it.");
		}

		return this.#transactions;
	}
}
