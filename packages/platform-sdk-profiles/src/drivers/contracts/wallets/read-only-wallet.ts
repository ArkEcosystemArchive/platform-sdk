import { Avatar } from "../services/avatar";

interface ROWallet {
	address: string;
	publicKey?: string;
	username?: string;
	rank?: number;
	explorerLink: string;
}

export class ReadOnlyWallet {
	readonly #wallet: ROWallet;

	public constructor(wallet: ROWallet) {
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

	public rank(): number | undefined {
		return this.#wallet.rank;
	}

	public avatar(): string {
		return Avatar.make(this.address());
	}

	public explorerLink(): string {
		return this.#wallet.explorerLink;
	}
}
