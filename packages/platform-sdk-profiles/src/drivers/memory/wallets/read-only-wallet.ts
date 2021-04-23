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

	/** {@inheritDoc IWalletFactory.generate} */
	public constructor(wallet: ROWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public address(): string {
		return this.#wallet.address;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public publicKey(): string | undefined {
		return this.#wallet.publicKey;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public username(): string | undefined {
		return this.#wallet.username;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public rank(): number | undefined {
		return this.#wallet.rank;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public avatar(): string {
		return Avatar.make(this.address());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public explorerLink(): string {
		return this.#wallet.explorerLink;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isDelegate(): boolean {
		return this.#wallet.isDelegate;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isResignedDelegate(): boolean {
		return this.#wallet.isResignedDelegate;
	}
}
