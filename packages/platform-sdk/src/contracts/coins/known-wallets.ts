export interface KnownWallet {
	type: string;
	name: string;
	address: string;
}

export interface KnownWalletService {
	destruct(): Promise<void>;

	all(): Promise<KnownWallet[]>;
}
