export interface IReadOnlyWallet {
	address(): string;
	publicKey(): string | undefined;
	username(): string | undefined;
	rank(): number | undefined;
	avatar(): string;
	explorerLink(): string;
}
