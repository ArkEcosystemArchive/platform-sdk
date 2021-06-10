export interface KnownWallet {
	type: string;
	name: string;
	address: string;
}
export interface KnownWalletService {
	all(): Promise<KnownWallet[]>;
}
