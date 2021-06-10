import { IReadOnlyWallet } from "../../../contracts";
interface ROWallet {
	address: string;
	publicKey?: string;
	username?: string;
	rank?: number;
	explorerLink: string;
	isDelegate: boolean;
	isResignedDelegate: boolean;
}
export declare class ReadOnlyWallet implements IReadOnlyWallet {
	#private;
	constructor(wallet: ROWallet);
	/** {@inheritDoc IReadOnlyWallet.address} */
	address(): string;
	/** {@inheritDoc IReadOnlyWallet.publicKey} */
	publicKey(): string | undefined;
	/** {@inheritDoc IReadOnlyWallet.username} */
	username(): string | undefined;
	/** {@inheritDoc IReadOnlyWallet.rank} */
	rank(): number | undefined;
	/** {@inheritDoc IReadOnlyWallet.avatar} */
	avatar(): string;
	/** {@inheritDoc IReadOnlyWallet.explorerLink} */
	explorerLink(): string;
	/** {@inheritDoc IReadOnlyWallet.isDelegate} */
	isDelegate(): boolean;
	/** {@inheritDoc IReadOnlyWallet.isResignedDelegate} */
	isResignedDelegate(): boolean;
}
export {};
