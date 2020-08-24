import { CoinRepository } from "../environment/coin-repository";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { ReadOnlyWallet } from "../wallets/read-only-wallet";
import { ReadWriteWallet } from "../wallets/wallet.models";

export class DelegateMapper {
	public static execute(wallet: ReadWriteWallet, publicKeys: string[]): ReadOnlyWallet[] {
		if (publicKeys.length === 0) {
			return [];
		}

		const delegates: Record<string, string>[] = container
			.get<CoinRepository>(Identifiers.CoinRepository)
			.delegates(wallet.coinId(), wallet.networkId());

		return publicKeys
			.map((publicKey: string) => {
				const delegate = Object.values(delegates).find(
					(delegate: Record<string, string>) => delegate.publicKey === publicKey,
				);

				if (!delegate) {
					return undefined;
				}

				return new ReadOnlyWallet({
					address: delegate.address,
					publicKey,
					username: delegate.username,
					rank: (delegate.rank as unknown) as number,
					explorerLink: wallet.link().wallet(delegate.address),
				});
			})
			.filter(Boolean) as ReadOnlyWallet[];
	}
}
