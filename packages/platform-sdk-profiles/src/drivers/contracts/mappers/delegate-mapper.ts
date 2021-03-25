import { IReadOnlyWallet } from "../wallets/read-only-wallet";
import { ReadWriteWallet } from "../wallets/wallet";

export interface IDelegateMapper {
    execute(wallet: ReadWriteWallet, publicKeys: string[]): IReadOnlyWallet[];
}
