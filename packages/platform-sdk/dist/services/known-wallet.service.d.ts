import { KnownWallet, KnownWalletService } from "./known-wallet.contract";
export declare class AbstractKnownWalletService implements KnownWalletService {
	__destruct(): Promise<void>;
	all(): Promise<KnownWallet[]>;
}
