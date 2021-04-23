import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { IReadWriteWallet, IWalletAggregate } from "../../../../contracts";
import { State } from "../../../../environment/state";

type NetworkType = "live" | "test";

export class WalletAggregate implements IWalletAggregate {
	/** {@inheritDoc IWalletFactory.generate} */
	public balance(networkType: NetworkType = "live"): BigNumber {
		return this.balancesByNetworkType()[networkType];
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public balancesByNetworkType(): Record<NetworkType, BigNumber> {
		return State.profile()
			.wallets()
			.values()
			.reduce(
				(totals: Record<NetworkType, BigNumber>, wallet: IReadWriteWallet) => {
					const networkType: NetworkType = wallet.network().isLive() ? "live" : "test";

					return {
						...totals,
						[networkType]: totals[networkType].plus(wallet.balance()),
					};
				},
				{
					live: BigNumber.ZERO,
					test: BigNumber.ZERO,
				},
			);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public convertedBalance(): BigNumber {
		return State.profile()
			.wallets()
			.values()
			.reduce(
				(total: BigNumber, wallet: IReadWriteWallet) => total.plus(wallet.convertedBalance()),
				BigNumber.ZERO,
			);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public balancePerCoin(networkType: NetworkType = "live"): Record<string, { total: number; percentage: number }> {
		const result = {};

		const totalByProfile: BigNumber = this.balance(networkType);
		const walletsByCoin: Record<string, Record<string, IReadWriteWallet>> = State.profile().wallets().allByCoin();

		for (const [coin, wallets] of Object.entries(walletsByCoin)) {
			const matchingWallets = Object.values(wallets).filter(
				(wallet: IReadWriteWallet) => wallet.network().isLive() === (networkType === "live"),
			);

			if (matchingWallets.length) {
				const totalByCoin: BigNumber = matchingWallets.reduce(
					(total: BigNumber, wallet: IReadWriteWallet) => total.plus(wallet.balance()),
					BigNumber.ZERO,
				);

				result[coin] = {
					total: totalByCoin.toFixed(),
					percentage: totalByProfile.isZero()
						? "0.00"
						: totalByCoin.divide(totalByProfile).times(100).toFixed(2),
				};
			}
		}

		return result;
	}
}
