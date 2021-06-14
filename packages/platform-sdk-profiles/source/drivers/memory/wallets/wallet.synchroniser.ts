import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { IReadWriteWallet, WalletData } from "../../../contracts";
import { IWalletSynchroniser } from "../../../contracts/wallets/wallet.synchroniser";

export class WalletSynchroniser implements IWalletSynchroniser {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletSynchroniser.coin} */
	public async coin(): Promise<void> {
		await this.#wallet.mutator().coin(this.#wallet.coinId(), this.#wallet.networkId());
	}

	/** {@inheritDoc IWalletSynchroniser.identity} */
	public async identity(): Promise<void> {
		const currentWallet = this.#wallet.getAttributes().get<Contracts.WalletData>("wallet");
		const currentPublicKey = this.#wallet.data().get<string>(WalletData.PublicKey);

		try {
			const wallet: Contracts.WalletData = await this.#wallet
				.getAttributes()
				.get<Coins.Coin>("coin")
				.client()
				.wallet(this.#wallet.address());

			this.#wallet.getAttributes().set("wallet", wallet);
			this.#wallet.data().set(WalletData.PublicKey, wallet.publicKey());
			this.#wallet.data().set(WalletData.Balance, wallet.balance());
			this.#wallet.data().set(WalletData.Sequence, wallet.nonce());
		} catch {
			/**
			 * TODO: decide what to do if the wallet couldn't be found
			 *
			 * A missing wallet could mean that the wallet is legitimate
			 * but has no transactions or that the address is wrong.
			 */

			this.#wallet.getAttributes().set("wallet", currentWallet);
			this.#wallet.data().set(WalletData.PublicKey, currentPublicKey);
		}
	}

	/** {@inheritDoc IWalletSynchroniser.multiSignature} */
	public async multiSignature(): Promise<void> {
		if (!this.#wallet.isMultiSignatureRegistration()) {
			return;
		}

		const participants: Record<string, any> = {};

		for (const publicKey of this.#wallet.multiSignature().all().publicKeys) {
			participants[publicKey] = (await this.#wallet.client().wallet(publicKey)).toObject();
		}

		this.#wallet.data().set(WalletData.MultiSignatureParticipants, participants);
	}

	/** {@inheritDoc IWalletSynchroniser.votes} */
	public async votes(): Promise<void> {
		const { available, publicKeys, used } = await this.#wallet.client().votes(this.#wallet.address());

		this.#wallet.data().set(WalletData.VotesAvailable, available);
		this.#wallet.data().set(WalletData.Votes, publicKeys);
		this.#wallet.data().set(WalletData.VotesUsed, used);
	}
}
