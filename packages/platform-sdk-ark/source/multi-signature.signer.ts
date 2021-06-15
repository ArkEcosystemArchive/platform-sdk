import { Managers, Transactions, Interfaces, Identities, Enums } from "@arkecosystem/crypto";
import { IoC } from "@arkecosystem/platform-sdk";

import { BindingType } from "./coin.contract";
import { MultiSignatureAsset, MultiSignatureTransaction } from "./multi-signature.contract";
import { PendingMultiSignatureTransaction } from "./multi-signature.transaction";

@IoC.injectable()
export class MultiSignatureSigner {
	@IoC.inject(BindingType.Crypto)
	private readonly config!: Interfaces.NetworkConfig;

	@IoC.inject(BindingType.Height)
	private readonly height!: number;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		Managers.configManager.setConfig(this.config);
		Managers.configManager.setHeight(this.height);
	}

	// The first argument should be a TransactionBuilder but we have no proper type to hint that.
	public sign(
		transaction: any,
		multiSignature: MultiSignatureAsset,
		mnemonic?: string,
		senderPublicKey?: string,
	): MultiSignatureTransaction {
		if (senderPublicKey) {
			const publicKeyIndex: number = multiSignature.publicKeys.indexOf(senderPublicKey);

			transaction.senderPublicKey(senderPublicKey);

			if (publicKeyIndex > -1) {
				if (mnemonic) {
					transaction.multiSign(mnemonic, publicKeyIndex);
				}
			}
		}

		if (transaction.data.type === Enums.TransactionType.MultiSignature && !transaction.signatures) {
			transaction.data.signatures = [];
		}

		if (!transaction.data.senderPublicKey) {
			transaction.senderPublicKey(Identities.PublicKey.fromMultiSignatureAsset(multiSignature));
		}

		const data =
			transaction.data.type === Enums.TransactionType.MultiSignature
				? transaction.getStruct()
				: transaction.build().toJson();

		data.multiSignature = multiSignature;

		if (!data.signatures) {
			data.signatures = [];
		}

		return data;
	}

	public addSignature(
		transaction: MultiSignatureTransaction,
		primaryKeys: Interfaces.IKeyPair,
		secondaryKeys?: Interfaces.IKeyPair,
	): MultiSignatureTransaction {
		const pendingMultiSignature = new PendingMultiSignatureTransaction(transaction);

		const isReady = pendingMultiSignature.isMultiSignatureReady({ excludeFinal: true });

		if (!isReady) {
			const index: number = transaction.multiSignature.publicKeys.indexOf(primaryKeys.publicKey);

			if (index === -1) {
				throw new Error(`The public key [${primaryKeys.publicKey}] is not associated with this transaction.`);
			}

			Transactions.Signer.multiSign(transaction, primaryKeys, index);
		}

		if (isReady && pendingMultiSignature.needsFinalSignature()) {
			Transactions.Signer.sign(transaction, primaryKeys);

			if (secondaryKeys) {
				Transactions.Signer.secondSign(transaction, secondaryKeys);
			}

			transaction.id = Transactions.Utils.getId(transaction);
		}

		return transaction;
	}
}
