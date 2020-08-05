import { Contracts } from "@arkecosystem/platform-sdk";

import { Avatar } from "../services/avatar";

export class ReadOnlyWallet {
	#wallet!: { address: string; publicKey?: string; username?: string };

	public constructor(wallet: { address: string; publicKey?: string; username?: string }) {
		this.#wallet = wallet;
	}

	public address(): string {
		return this.#wallet.address;
	}

	public publicKey(): string | undefined {
		return this.#wallet.publicKey;
	}

	public username(): string | undefined {
		return this.#wallet.username;
	}

	public avatar(): string {
		return Avatar.make(this.address());
	}
}
