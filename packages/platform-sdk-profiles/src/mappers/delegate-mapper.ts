import { CoinRepository } from "../environment/coin-repository";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { DelegateService } from "../environment/services/delegate-service";
import { ReadOnlyWallet } from "../wallets/read-only-wallet";
import { ReadWriteWallet } from "../wallets/wallet.models";

export class DelegateMapper {
	public static execute(wallet: ReadWriteWallet, publicKeys: string[]): ReadOnlyWallet[] {
		if (publicKeys.length === 0) {
			return [];
		}

		return publicKeys
			.map((publicKey: string) => {
				const delegate = container
					.get<DelegateService>(Identifiers.DelegateService)
					.findByPublicKey(wallet.coinId(), wallet.networkId(), publicKey);

				if (!delegate) {
					return undefined;
				}

				return new ReadOnlyWallet({
					address: delegate.address(),
					publicKey: delegate.publicKey(),
					username: delegate.username(),
					rank: delegate.rank(),
					explorerLink: wallet.link().wallet(delegate.address()),
				});
			})
			.filter(Boolean) as ReadOnlyWallet[];
	}
}
