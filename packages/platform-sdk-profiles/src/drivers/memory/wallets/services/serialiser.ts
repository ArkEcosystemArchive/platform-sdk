import { Coins } from "@arkecosystem/platform-sdk";
import dot from "dot-prop";

import {
	IReadWriteWallet,
	IWalletData,
	WalletData,
	WalletFlag,
} from "../../../../contracts";

export class WalletSerialiser {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletSerialiser.toJSON} */
	public toJSON(): IWalletData {
		if (this.#wallet.hasBeenPartiallyRestored()) {
			return this.#wallet.getAttributes().get<IWalletData>('initialState');
		}

		this.#wallet.transaction().dump();

		const network: Coins.CoinNetwork = this.#wallet.coin().network().toObject();

		return {
			id: this.#wallet.id(),
			coin: this.#wallet.coin().manifest().get<string>("name"),
			network: this.#wallet.networkId(),
			// We only persist a few settings to prefer defaults from the SDK.
			networkConfig: {
				crypto: {
					slip44: network.crypto.slip44,
				},
				networking: {
					hosts: network.networking.hosts,
					hostsMultiSignature: dot.get(network, "networking.hostsMultiSignature", []),
					hostsArchival: dot.get(network, "networking.hostsArchival", []),
				},
			},
			address: this.#wallet.address(),
			publicKey: this.#wallet.publicKey(),
			data: {
				[WalletData.Balance]: this.#wallet.balance().toFixed(),
				[WalletData.BroadcastedTransactions]: this.#wallet.data().get(WalletData.BroadcastedTransactions, []),
				[WalletData.Sequence]: this.#wallet.nonce().toFixed(),
				[WalletData.SignedTransactions]: this.#wallet.data().get(WalletData.SignedTransactions, []),
				[WalletData.Votes]: this.#wallet.data().get(WalletData.Votes, []),
				[WalletData.VotesAvailable]: this.#wallet.data().get(WalletData.VotesAvailable, 0),
				[WalletData.VotesUsed]: this.#wallet.data().get(WalletData.VotesUsed, 0),
				[WalletData.WaitingForOurSignatureTransactions]: this.#wallet.data().get(
					WalletData.WaitingForOurSignatureTransactions,
					[],
				),
				[WalletData.WaitingForOtherSignaturesTransactions]: this.#wallet.data().get(
					WalletData.WaitingForOtherSignaturesTransactions,
					[],
				),
				[WalletData.LedgerPath]: this.#wallet.data().get(WalletData.LedgerPath),
				[WalletData.Bip38EncryptedKey]: this.#wallet.data().get(WalletData.Bip38EncryptedKey),
				[WalletFlag.Starred]: this.#wallet.isStarred(),
			},
			settings: this.#wallet.settings().all(),
		};
	}
}
