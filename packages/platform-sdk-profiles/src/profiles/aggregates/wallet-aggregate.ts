import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Wallet } from "../../wallets/wallet";
import { ReadWriteWallet } from "../../wallets/wallet.models";
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
			.reduce((total: BigNumber, wallet: ReadWriteWallet) => total.plus(wallet.balance()), BigNumber.ZERO);
	}

	public convertedBalance(): BigNumber {
		return this.#profile
			.wallets()
			.values()
			.reduce(
				(total: BigNumber, wallet: ReadWriteWallet) => total.plus(wallet.convertedBalance()),
				BigNumber.ZERO,
			);
	}

	public balancePerCoin(): Record<string, { total: number; percentage: number }> {
		const result = {};

		const totalByProfile: BigNumber = this.#profile.balance();
		const walletsByCoin: Record<string, Record<string, ReadWriteWallet>> = this.#profile.wallets().allByCoin();

		for (const [coin, wallets] of Object.entries(walletsByCoin)) {
			const totalByCoin: BigNumber = Object.values(wallets).reduce(
				(total: BigNumber, wallet: ReadWriteWallet) => total.plus(wallet.balance()),
				BigNumber.ZERO,
			);

			result[coin] = {
				total: totalByCoin.toFixed(),
				percentage: totalByProfile.isZero() ? "0.00" : totalByCoin.divide(totalByProfile).times(100).toFixed(2),
			};
		}

		return result;
	}
}
