import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { ReadWriteWallet } from "../../wallets/wallet.models";
import { ProfileContract } from "../profile.models";

type NetworkType = "live" | "test";

export interface IWalletAggregate {
    balance(networkType: NetworkType): BigNumber;
    balancesByNetworkType(): Record<NetworkType, BigNumber>;
    convertedBalance(): BigNumber;
    balancePerCoin(networkType: NetworkType): Record<string, { total: number; percentage: number }>;
}
