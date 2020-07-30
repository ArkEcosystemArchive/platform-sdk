import { BigNumber } from "../../../platform-sdk-support/dist";
import { Wallet } from "../wallet";

export class WalletAggregate {
	// @TODO: add typehint
	readonly #profile;

	// @TODO: add typehint
	public constructor(profile) {
		this.#profile = profile;
	}

	public balancePerCoin(): Record<string, { total: number; percentage: number }> {
		const result = {};

		const totalByProfile: BigNumber = this.#profile.balance();
		const walletsByCoin: Record<string, Record<string, Wallet>> = this.#profile.wallets().allByCoin();

		for (const [coin, wallets] of Object.entries(walletsByCoin)) {
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
