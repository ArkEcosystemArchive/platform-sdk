import { IReadOnlyWallet } from "../../../contracts";
import { Avatar } from "../../../helpers/avatar";

interface ROWallet {
	address: string;
	publicKey?: string;
	username?: string;
	rank?: number;
	explorerLink: string;
	isDelegate: boolean;
	isResignedDelegate: boolean;
}

export class ReadOnlyWallet implements IReadOnlyWallet {
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

	public isDelegate(): boolean {
		return this.#wallet.isDelegate;
	}

	public isResignedDelegate(): boolean {
		return this.#wallet.isResignedDelegate;
	}
}
