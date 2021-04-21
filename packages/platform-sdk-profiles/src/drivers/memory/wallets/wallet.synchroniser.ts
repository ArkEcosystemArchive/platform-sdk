import { IReadWriteWallet, WalletData } from "../../../contracts";
import { IWalletSynchroniser } from "../../../contracts/wallets/wallet.synchroniser";
import { State } from "../../../environment/state";

export class WalletSynchroniser implements IWalletSynchroniser {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	public async coin(options: { resetCoin: boolean } = { resetCoin: false }): Promise<void> {
		if (options.resetCoin) {
			this.#coin = State.profile().coins().push(this.#wallet.coinId(), this.#wallet.networkId(), {}, true);
		}

		await this.#wallet.setCoin(this.#wallet.coinId(), this.#wallet.networkId());
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
		if (!this.#wallet.isMultiSignature()) {
			return;
		}

		const participants: Record<string, any> = {};

		for (const publicKey of this.#wallet.multiSignature().publicKeys) {
			participants[publicKey] = (await this.#wallet.client().wallet(publicKey)).toObject();
		}

		this.#wallet.data().set(WalletData.MultiSignatureParticipants, participants);
	}

	public async votes(): Promise<void> {
		const { available, publicKeys, used } = await this.#wallet.client().votes(this.#wallet.address());

		this.#wallet.data().set(WalletData.VotesAvailable, available);
		this.#wallet.data().set(WalletData.Votes, publicKeys);
		this.#wallet.data().set(WalletData.VotesUsed, used);
	}
}
