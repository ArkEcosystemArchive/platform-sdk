import { Avatar } from "../services/avatar";

interface ROWallet {
	address: string;
	publicKey?: string;
	username?: string;
	rank?: number;
	explorerLink: string;
}

export interface IReadOnlyWallet {
    address(): string;
    publicKey(): string | undefined;
    username(): string | undefined;
    rank(): number | undefined;
    avatar(): string;
    explorerLink(): string;
}
