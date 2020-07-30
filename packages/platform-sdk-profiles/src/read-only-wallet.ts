import { Contracts } from "@arkecosystem/platform-sdk";

import { Avatar } from "./avatar";

export class ReadOnlyWallet {
	#wallet!: Contracts.WalletData;

	public constructor(wallet: Contracts.WalletData) {
		this.#wallet = wallet;
	}

	public address(): string {
		return this.#wallet.address();
	}

	public publicKey(): string | undefined {
		return this.#wallet.publicKey();
	}

	public username(): string | undefined {
		return this.#wallet.username();
	}

	public avatar(): string {
		return Avatar.make(this.address());
	}
}
