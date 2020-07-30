import { BigNumber } from "../../../platform-sdk-support/dist";
import { Wallet } from "../wallet";

export class WalletAggregate {
	readonly #profile;

	public constructor(profile) {
		this.#profile = profile;
	}

	public balancePerCoin(): Record<string, { total: number; percentage: number }> {
		const result = {};

		const totalByProfile: BigNumber = this.#profile.balance();

		for (const [coin, wallets] of Object.entries(this.#profile.wallets().allByCoin())) {
			const totalByCoin: BigNumber = Object.values(wallets).reduce(
				(total: BigNumber, wallet: Wallet) => total.plus(wallet.balance()),
				BigNumber.ZERO,
			);

			result[coin] = {
				total: totalByCoin.toFixed(),
				percentage: totalByCoin.divide(totalByProfile).times(100).toFixed(2),
			};
		}

		return result;
	}
}
