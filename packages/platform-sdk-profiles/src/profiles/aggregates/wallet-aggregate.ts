import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Wallet } from "../../wallets/wallet";
import { ProfileContract } from "../profile.models";

export class WalletAggregate {
	readonly #profile: ProfileContract;

	public constructor(profile: ProfileContract) {
		this.#profile = profile;
	}

	public balance(): BigNumber {
		return this.#profile
			.wallets()
			.values()
			.reduce((total: BigNumber, wallet: Wallet) => total.plus(wallet.balance()), BigNumber.ZERO);
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
