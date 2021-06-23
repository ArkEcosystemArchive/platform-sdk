import { Networks, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { IReadWriteWallet, IWalletData, WalletData, WalletFlag } from "./contracts";

type SerializedBalance = {
	available: string;
	fees: string;
	locked?: string;
	tokens?: Record<string, string>;
};

export class WalletSerialiser {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletSerialiser.toJSON} */
	public toJSON(): IWalletData {
		if (this.#wallet.hasBeenPartiallyRestored()) {
			return this.#wallet.getAttributes().get<IWalletData>("initialState");
		}

		this.#wallet.transaction().dump();

		const network: Networks.NetworkManifest = this.#wallet.coin().network().toObject();

		return {
			id: this.#wallet.id(),
			data: {
				[WalletData.Coin]: this.#wallet.coin().manifest().get<string>("name"),
				[WalletData.Network]: this.#wallet.networkId(),
				[WalletData.Address]: this.#wallet.address(),
				[WalletData.PublicKey]: this.#wallet.publicKey(),
				[WalletData.Balance]: this.#serializeBalance(),
				[WalletData.BroadcastedTransactions]: this.#wallet.data().get(WalletData.BroadcastedTransactions, []),
				[WalletData.DerivationPath]: this.#wallet.data().get(WalletData.DerivationPath),
				[WalletData.DerivationType]: this.#wallet.data().get(WalletData.DerivationType),
				[WalletData.ImportMethod]: this.#wallet.data().get(WalletData.ImportMethod),
				[WalletData.Sequence]: this.#wallet.nonce().toFixed(),
				[WalletData.SignedTransactions]: this.#wallet.data().get(WalletData.SignedTransactions, []),
				[WalletData.Votes]: this.#wallet.data().get(WalletData.Votes, []),
				[WalletData.VotesAvailable]: this.#wallet.data().get(WalletData.VotesAvailable, 0),
				[WalletData.VotesUsed]: this.#wallet.data().get(WalletData.VotesUsed, 0),
				[WalletData.WaitingForOurSignatureTransactions]: this.#wallet
					.data()
					.get(WalletData.WaitingForOurSignatureTransactions, []),
				[WalletData.WaitingForOtherSignaturesTransactions]: this.#wallet
					.data()
					.get(WalletData.WaitingForOtherSignaturesTransactions, []),
				[WalletData.Bip38EncryptedKey]: this.#wallet.data().get(WalletData.Bip38EncryptedKey),
				[WalletFlag.Starred]: this.#wallet.isStarred(),
			},
			settings: this.#wallet.settings().all(),
		};
	}

	#serializeBalance(): SerializedBalance {
		const balance = this.#wallet.data().get<Contracts.WalletBalance>(WalletData.Balance);

		const serializedBalance: SerializedBalance = {
			available: this.#wallet.coin().bigNumber().make(balance?.available || 0).toString(),
			fees: this.#wallet.coin().bigNumber().make(balance?.fees || 0).toString(),
		};

		if (balance?.locked) {
			serializedBalance.locked = balance.locked.toString();
		}

		if (balance?.tokens) {
			serializedBalance.tokens = {};

			for (const [key, value] of Object.entries(balance.tokens)) {
				serializedBalance.tokens[key] = value.toString();
			}
		}

		return serializedBalance;
	}
}
