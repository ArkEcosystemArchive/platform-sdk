import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { IProfile, IWalletAggregate } from "../../../../contracts";
declare type NetworkType = "live" | "test";
export declare class WalletAggregate implements IWalletAggregate {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IWalletAggregate.balance} */
	balance(networkType?: NetworkType): BigNumber;
	/** {@inheritDoc IWalletAggregate.balancesByNetworkType} */
	balancesByNetworkType(): Record<NetworkType, BigNumber>;
	/** {@inheritDoc IWalletAggregate.convertedBalance} */
	convertedBalance(): BigNumber;
	/** {@inheritDoc IWalletAggregate.balancePerCoin} */
	balancePerCoin(
		networkType?: NetworkType,
	): Record<
		string,
		{
			total: number;
			percentage: number;
		}
	>;
}
export {};
