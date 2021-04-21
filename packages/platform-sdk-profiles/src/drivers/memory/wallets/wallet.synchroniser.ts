import { IReadWriteWallet } from "../../../contracts";

export class WalletSynchroniser implements IWalletSynchroniser {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	public async sync(options: { resetCoin: boolean } = { resetCoin: false }): Promise<void> {
		if (options.resetCoin) {
			this.#coin = State.profile().coins().push(this.coinId(), this.networkId(), {}, true);
		}

		await this.setCoin(this.coinId(), this.networkId());
	}

	public async identity(): Promise<void> {
		const currentWallet = this.#wallet;
		const currentPublicKey = this.#publicKey;

		try {
			this.#wallet = await this.#coin.client().wallet(this.address());

			if (!this.#publicKey) {
				this.#publicKey = this.#wallet.publicKey();
			}

			this.#wallet.data().set(WalletData.Balance, this.#wallet.balance());
			this.#wallet.data().set(WalletData.Sequence, this.#wallet.nonce());
		} catch {
			/**
			 * TODO: decide what to do if the wallet couldn't be found
			 *
			 * A missing wallet could mean that the wallet is legitimate
			 * but has no transactions or that the address is wrong.
			 */

			this.#wallet = currentWallet;
			this.#publicKey = currentPublicKey;
		}
	}

	public async multiSignature(): Promise<void> {
		if (!this.isMultiSignature()) {
			return;
		}

		const participants: Record<string, any> = {};

		for (const publicKey of this.multiSignature().publicKeys) {
			participants[publicKey] = (await this.client().wallet(publicKey)).toObject();
		}

		this.#wallet.data().set(WalletData.MultiSignatureParticipants, participants);
	}

	public async votes(): Promise<void> {
		const { available, publicKeys, used } = await this.client().votes(this.address());

		this.#wallet.data().set(WalletData.VotesAvailable, available);
		this.#wallet.data().set(WalletData.Votes, publicKeys);
		this.#wallet.data().set(WalletData.VotesUsed, used);
	}
}
