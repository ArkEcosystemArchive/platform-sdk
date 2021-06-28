import { Managers, Transactions, Interfaces, Identities, Enums, Utils } from "@arkecosystem/crypto";
import { Contracts, IoC, Services, Signatories } from "@arkecosystem/platform-sdk";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";

import { BindingType } from "./coin.contract";
import { MultiSignatureAsset, MultiSignatureTransaction } from "./multi-signature.contract";
import { PendingMultiSignatureTransaction } from "./multi-signature.transaction";

@IoC.injectable()
export class MultiSignatureSigner {
	@IoC.inject(IoC.BindingType.LedgerService)
	private readonly ledgerService!: Services.LedgerService;

	@IoC.inject(IoC.BindingType.KeyPairService)
	private readonly keyPairService!: Services.KeyPairService;

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

	public async addSignature(
		transaction: Contracts.RawTransactionData,
		input: Services.TransactionInputs,
	): Promise<MultiSignatureTransaction> {
		const pendingMultiSignature = new PendingMultiSignatureTransaction(transaction);

		const isReady = pendingMultiSignature.isMultiSignatureReady({ excludeFinal: true });

		const { signingKeys, confirmKeys } = await this.#deriveKeyPairs(input);

		if (!isReady) {
			if (input.signatory.actsWithLedger()) {
				const index: number = this.#publicKeyIndex(
					transaction,
					await this.ledgerService.getPublicKey(input.signatory.signingKey()),
				);

				if (!transaction.signatures) {
					transaction.signatures = [];
				}

				const signature: string = await this.#signWithLedger(transaction, input.signatory, true);
				const signatureIndex: string = Utils.numberToHex(index === -1 ? transaction.signatures.length : index);

				transaction.signatures.push(`${signatureIndex}${signature}`);
			} else {
				if (!signingKeys) {
					throw new Error("Failed to retrieve the signing keys for the signatory wallet.");
				}

				Transactions.Signer.multiSign(
					transaction,
					signingKeys,
					this.#publicKeyIndex(transaction, signingKeys.publicKey),
				);
			}
		}

		if (isReady && pendingMultiSignature.needsFinalSignature()) {
			if (signingKeys) {
				Transactions.Signer.sign(transaction, signingKeys);
			}

			if (confirmKeys) {
				Transactions.Signer.secondSign(transaction, confirmKeys);
			}

			if (input.signatory.actsWithLedger()) {
				transaction.signature = this.#signWithLedger(transaction, input.signatory);
			}

			transaction.id = Transactions.Utils.getId(transaction);
		}

		return transaction;
	}

	async #deriveKeyPairs(input: Services.TransactionInputs): Promise<{
		signingKeys: Interfaces.IKeyPair | undefined;
		confirmKeys: Interfaces.IKeyPair | undefined;
	}> {
		let signingKeys: Services.KeyPairDataTransferObject | undefined = undefined;
		let confirmKeys: Services.KeyPairDataTransferObject | undefined = undefined;

		if (input.signatory.actsWithLedger()) {
			return { signingKeys, confirmKeys };
		}

		if (input.signatory.actsWithMnemonic()) {
			signingKeys = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
		}

		if (input.signatory.actsWithSecondaryMnemonic()) {
			signingKeys = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
			confirmKeys = await this.keyPairService.fromMnemonic(input.signatory.confirmKey());
		}

		if (input.signatory.actsWithWif()) {
			signingKeys = await this.keyPairService.fromWIF(input.signatory.signingKey());
		}

		if (input.signatory.actsWithSecondaryWif()) {
			signingKeys = await this.keyPairService.fromWIF(input.signatory.signingKey());
			confirmKeys = await this.keyPairService.fromWIF(input.signatory.confirmKey());
		}

		if (!signingKeys) {
			throw new Error("Failed to retrieve the signing keys for the signatory wallet.");
		}

		return {
			signingKeys: this.#formatKeyPair(signingKeys),
			confirmKeys: this.#formatKeyPair(confirmKeys),
		};
	}

	async #signWithLedger(
		transaction: MultiSignatureTransaction,
		signatory: Signatories.Signatory,
		excludeMultiSignature = false,
	): Promise<string> {
		await this.ledgerService.connect(LedgerTransportNodeHID);

		const signature = await this.ledgerService.signTransaction(
			signatory.signingKey(),
			Transactions.Serializer.getBytes(transaction, {
				excludeSignature: true,
				excludeSecondSignature: true,
				excludeMultiSignature,
			}),
		);

		await this.ledgerService.disconnect();

		return signature;
	}

	#formatKeyPair(keyPair?: Services.KeyPairDataTransferObject): Interfaces.IKeyPair | undefined {
		if (keyPair) {
			return {
				publicKey: keyPair.publicKey,
				privateKey: keyPair.privateKey,
				compressed: true,
			};
		}

		return undefined;
	}

	#publicKeyIndex(transaction: Contracts.RawTransactionData, publicKey: string): number {
		const index: number = transaction.multiSignature.publicKeys.indexOf(publicKey);

		if (index === -1) {
			throw new Error(`The public key [${publicKey}] is not associated with this transaction.`);
		}

		return index;
	}
}
