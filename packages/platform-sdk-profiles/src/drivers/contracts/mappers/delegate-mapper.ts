import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { DelegateService } from "../services/delegate-service";
import { ReadOnlyWallet } from "../wallets/read-only-wallet";
import { ReadWriteWallet } from "../wallets/wallet.models";

export interface IDelegateMapper {
    execute(wallet: ReadWriteWallet, publicKeys: string[]): ReadOnlyWallet[];
}
