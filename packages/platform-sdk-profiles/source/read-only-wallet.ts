import { IReadOnlyWallet } from "./contracts";
import { Avatar } from "./helpers/avatar";

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

	/** {@inheritDoc IReadOnlyWallet.address} */
	public address(): string {
		return this.#wallet.address;
	}

	/** {@inheritDoc IReadOnlyWallet.publicKey} */
	public publicKey(): string | undefined {
		return this.#wallet.publicKey;
	}

	/** {@inheritDoc IReadOnlyWallet.username} */
	public username(): string | undefined {
		return this.#wallet.username;
	}

	/** {@inheritDoc IReadOnlyWallet.rank} */
	public rank(): number | undefined {
		return this.#wallet.rank;
	}

	/** {@inheritDoc IReadOnlyWallet.avatar} */
	public avatar(): string {
		return Avatar.make(this.address());
	}

	/** {@inheritDoc IReadOnlyWallet.explorerLink} */
	public explorerLink(): string {
		return this.#wallet.explorerLink;
	}

	/** {@inheritDoc IReadOnlyWallet.isDelegate} */
	public isDelegate(): boolean {
		return this.#wallet.isDelegate;
	}

	/** {@inheritDoc IReadOnlyWallet.isResignedDelegate} */
	public isResignedDelegate(): boolean {
		return this.#wallet.isResignedDelegate;
	}
}
