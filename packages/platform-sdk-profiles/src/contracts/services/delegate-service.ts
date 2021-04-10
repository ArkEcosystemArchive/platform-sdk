import { IReadWriteWallet } from "../wallets";
import { IReadOnlyWallet } from "../wallets/read-only-wallet";

export interface IDelegateService {
	all(coin: string, network: string): IReadOnlyWallet[];
	findByAddress(coin: string, network: string, address: string): IReadOnlyWallet;
	findByPublicKey(coin: string, network: string, publicKey: string): IReadOnlyWallet;
	findByUsername(coin: string, network: string, username: string): IReadOnlyWallet;
	sync(coin: string, network: string): Promise<void>;
	syncAll(): Promise<void>;
	map(wallet: IReadWriteWallet, publicKeys: string[]): IReadOnlyWallet[];
}
