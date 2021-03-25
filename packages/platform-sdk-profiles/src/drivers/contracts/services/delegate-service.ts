import { ReadOnlyWallet } from "../wallets/read-only-wallet";

export interface IDelegateService {
    all(coin: string, network: string): ReadOnlyWallet[];
    findByAddress(coin: string, network: string, address: string): ReadOnlyWallet;
    findByPublicKey(coin: string, network: string, publicKey: string): ReadOnlyWallet;
    findByUsername(coin: string, network: string, username: string): ReadOnlyWallet;
    sync(coin: string, network: string): Promise<void>;
    syncAll(): Promise<void>;
}
