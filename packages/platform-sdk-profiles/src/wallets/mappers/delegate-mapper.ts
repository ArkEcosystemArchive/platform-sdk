import { ReadOnlyWallet } from "../read-only-wallet";
import { WalletData } from "../wallet.models";

export class DelegateMapper {
	readonly #wallet;

	public constructor(wallet) {
		this.#wallet = wallet;
	}

	public map(publicKeys: string[]): ReadOnlyWallet[] {
		const delegates: Record<string, string>[] = this.#wallet.data().get(WalletData.Delegates);

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
					rank: delegate.rank,
				});
			})
			.filter(Boolean) as ReadOnlyWallet[];
	}
}
