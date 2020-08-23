import { CoinRepository } from "../../environment/coin-repository";
import { container } from "../../environment/container";
import { Identifiers } from "../../environment/container.models";
import { ReadOnlyWallet } from "../read-only-wallet";

export class DelegateMapper {
	public static execute(coin: string, network: string, publicKeys: string[]): ReadOnlyWallet[] {
		const delegates: Record<string, string>[] = container
			.get<CoinRepository>(Identifiers.CoinRepository)
			.delegates(coin, network);

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
				});
			})
			.filter(Boolean) as ReadOnlyWallet[];
	}
}
