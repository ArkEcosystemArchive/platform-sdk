import { BigNumber } from "@arkecosystem/platform-sdk-support";

type NetworkType = "live" | "test";

export interface IWalletAggregate {
	balance(networkType?: NetworkType): BigNumber;
	balancesByNetworkType(): Record<NetworkType, BigNumber>;
	convertedBalance(): BigNumber;
	balancePerCoin(networkType: NetworkType): Record<string, { total: number; percentage: number }>;
}
