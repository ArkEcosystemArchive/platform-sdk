export interface KnownWallet {
	type: string;
	name: string;
	address: string;
}

export interface KnownWalletsService {
	destruct(): Promise<void>;
	findByAddress(address: string): KnownWallet | undefined;
	isKnown(address: string): boolean;
	hasType(address: string, type: string): boolean;
	isOwnedByExchange(address: string): boolean;
	isOwnedByTeam(address: string): boolean;
	displayName(address: string): string | undefined;
}
