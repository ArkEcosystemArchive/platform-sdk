export interface KnownWallet {
	type: string;
	name: string;
	address: string;
}

export interface KnownWalletService {
	__destruct(): Promise<void>;

	all(): Promise<KnownWallet[]>;
}
