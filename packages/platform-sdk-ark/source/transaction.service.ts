import { Interfaces, Transactions } from "@arkecosystem/crypto";
import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";

import { BindingType } from "./coin.contract";
import { applyCryptoConfiguration } from "./config";
import { MultiSignatureSigner } from "./multi-signature.signer";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	@IoC.inject(IoC.BindingType.LedgerService)
	private readonly ledgerService!: Services.LedgerService;

	@IoC.inject(IoC.BindingType.AddressService)
	private readonly addressService!: Services.AddressService;

	@IoC.inject(IoC.BindingType.KeyPairService)
	private readonly keyPairService!: Services.KeyPairService;

	@IoC.inject(IoC.BindingType.PublicKeyService)
	private readonly publicKeyService!: Services.PublicKeyService;

	@IoC.inject(BindingType.MultiSignatureSigner)
	private readonly multiSignatureSigner!: MultiSignatureSigner;

	@IoC.inject(BindingType.Crypto)
	private readonly packageCrypto!: Interfaces.NetworkConfig;

	@IoC.inject(BindingType.Height)
	private readonly packageHeight!: number;

	// @TODO: remove or inject
	#peer!: string;
	#configCrypto!: { crypto: Interfaces.NetworkConfig; height: number };

	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("transfer", input, ({ transaction, data }) => {
			transaction.recipientId(data.to);

			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public override async secondSignature(
		input: Services.SecondSignatureInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("secondSignature", input, ({ transaction, data }) =>
			transaction.signatureAsset(BIP39.normalize(data.mnemonic)),
		);
	}

	public override async delegateRegistration(
		input: Services.DelegateRegistrationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("delegateRegistration", input, ({ transaction, data }) =>
			transaction.usernameAsset(data.username),
		);
	}

	public override async vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("vote", input, ({ transaction, data }) => {
			const votes: string[] = [];

			if (Array.isArray(data.unvotes)) {
				for (const unvote of data.unvotes) {
					votes.push(`-${unvote}`);
				}
			}

			if (Array.isArray(data.votes)) {
				for (const vote of data.votes) {
					votes.push(`+${vote}`);
				}
			}

			transaction.votesAsset(votes);
		});
	}

	public override async multiSignature(
		input: Services.MultiSignatureInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("multiSignature", input, ({ transaction, data }) => {
			transaction.multiSignatureAsset({
				publicKeys: data.publicKeys,
				min: data.min,
			});

			transaction.senderPublicKey(data.senderPublicKey);
		});
	}

	public override async ipfs(input: Services.IpfsInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("ipfs", input, ({ transaction, data }) => transaction.ipfsAsset(data.hash));
	}

	public override async multiPayment(input: Services.MultiPaymentInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("multiPayment", input, ({ transaction, data }) => {
			for (const payment of data.payments) {
				transaction.addPayment(payment.to, this.toSatoshi(payment.amount).toString());
			}

			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public override async delegateResignation(
		input: Services.DelegateResignationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("delegateResignation", input);
	}

	public override async htlcLock(input: Services.HtlcLockInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("htlcLock", input, ({ transaction, data }) => {
			transaction.amount(this.toSatoshi(data.amount).toString());

			transaction.recipientId(data.to);

			transaction.htlcLockAsset({
				secretHash: data.secretHash,
				expiration: data.expiration,
			});
		});
	}

	public override async htlcClaim(input: Services.HtlcClaimInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("htlcClaim", input, ({ transaction, data }) =>
			transaction.htlcClaimAsset({
				lockTransactionId: data.lockTransactionId,
				unlockSecret: data.unlockSecret,
			}),
		);
	}

	public override async htlcRefund(input: Services.HtlcRefundInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("htlcRefund", input, ({ transaction, data }) =>
			transaction.htlcRefundAsset({
				lockTransactionId: data.lockTransactionId,
			}),
		);
	}

	/**
	 * This method should be used to split-sign transactions in combination with the MuSig Server.
	 *
	 * @param transaction A transaction that was previously signed with a multi-signature.
	 * @param input
	 */
	public override async multiSign(
		transaction: Contracts.RawTransactionData,
		input: Services.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		applyCryptoConfiguration(this.#configCrypto);

		let keys: Services.KeyPairDataTransferObject | undefined;

		if (input.signatory.actsWithMnemonic()) {
			keys = await this.keyPairService.fromMnemonic(input.signatory.signingKey());
		}

		if (input.signatory.actsWithWif()) {
			keys = await this.keyPairService.fromWIF(input.signatory.signingKey());
		}

		if (!keys) {
			throw new Error("Failed to retrieve the keys for the signatory wallet.");
		}

		const transactionWithSignature = this.multiSignatureSigner.addSignature(transaction, {
			publicKey: keys.publicKey,
			privateKey: keys.privateKey,
			compressed: true,
		});

		return this.dataTransferObjectService.signedTransaction(
			transactionWithSignature.id!,
			transactionWithSignature,
			transactionWithSignature,
		);
	}

	public override async estimateExpiration(value?: string): Promise<string | undefined> {
		const { data: blockchain } = (await this.httpClient.get(`${this.#peer}/blockchain`)).json();
		const { data: configuration } = (await this.httpClient.get(`${this.#peer}/node/configuration`)).json();

		return BigNumber.make(blockchain.block.height)
			.plus(value || 5 * configuration.constants.activeDelegates)
			.toString();
	}

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#peer = Helpers.randomHostFromConfig(this.configRepository);
		this.#configCrypto = { crypto: this.packageCrypto, height: this.packageHeight };
	}

	async #createFromData(
		type: string,
		input: Services.TransactionInputs,
		callback?: Function,
	): Promise<Contracts.SignedTransactionData> {
		applyCryptoConfiguration(this.#configCrypto);

		try {
			let address: string | undefined;

			if (
				input.signatory.actsWithMnemonic() ||
				input.signatory.actsWithSecondaryMnemonic() ||
				input.signatory.actsWithPrivateMultiSignature()
			) {
				address = (await this.addressService.fromMnemonic(input.signatory.signingKey())).address;
			}

			if (input.signatory.actsWithWif()) {
				address = (await this.addressService.fromWIF(input.signatory.signingKey())).address;
			}

			const transaction = Transactions.BuilderFactory[type]().version(2);

			if (input.signatory.actsWithLedger()) {
				await this.ledgerService.connect(LedgerTransportNodeHID);

				const senderPublicKey = await this.ledgerService.getPublicKey(input.signatory.signingKey());
				transaction.senderPublicKey(senderPublicKey);

				address = (await this.addressService.fromPublicKey(senderPublicKey)).address;
			}

			if (input.signatory.actsWithSenderPublicKey()) {
				address = input.signatory.address();

				transaction.senderPublicKey(input.signatory.signingKey());
			}

			if (input.nonce) {
				transaction.nonce(input.nonce);
			} else {
				const { data } = (await this.httpClient.get(`${this.#peer}/wallets/${address}`)).json();

				transaction.nonce(BigNumber.make(data.nonce).plus(1).toFixed());
			}

			if (input.data && input.data.amount) {
				transaction.amount(this.toSatoshi(input.data.amount).toString());
			}

			if (input.fee) {
				transaction.fee(this.toSatoshi(input.fee).toString());
			}

			try {
				if (input.data && input.data.expiration) {
					transaction.expiration(input.data.expiration);
				} else {
					const estimatedExpiration = await this.estimateExpiration();

					if (estimatedExpiration) {
						transaction.expiration(parseInt(estimatedExpiration));
					}
				}
			} catch {
				// If we fail to set the expiration we'll still continue.
			}

			if (callback) {
				callback({ transaction, data: input.data });
			}

			if (input.signatory.actsWithLedger()) {
				transaction.data.signature = await this.ledgerService.signTransaction(
					input.signatory.signingKey(),
					Transactions.Serializer.getBytes(transaction.data, {
						excludeSignature: true,
						excludeSecondSignature: true,
					}),
				);

				await this.ledgerService.disconnect();
			}

			if (input.signatory.actsWithMultiSignature()) {
				const transactionWithSignature = this.multiSignatureSigner.sign(
					transaction,
					input.signatory.signingList(),
				);

				return this.dataTransferObjectService.signedTransaction(
					transactionWithSignature.id!,
					transactionWithSignature,
					transactionWithSignature,
				);
			}

			const actsWithMultiMnemonic =
				input.signatory.actsWithMultiMnemonic() || input.signatory.actsWithPrivateMultiSignature();

			if (actsWithMultiMnemonic && Array.isArray(input.signatory.signingKeys())) {
				const signingKeys: string[] = input.signatory.signingKeys();

				const senderPublicKeys: string[] = (
					await Promise.all(
						signingKeys.map((mnemonic: string) => this.publicKeyService.fromMnemonic(mnemonic)),
					)
				).map(({ publicKey }) => publicKey);

				transaction.senderPublicKey(
					(await this.publicKeyService.fromMultiSignature(signingKeys.length, senderPublicKeys)).publicKey,
				);

				for (let i = 0; i < signingKeys.length; i++) {
					transaction.multiSign(signingKeys[i], i);
				}
			} else {
				if (input.signatory.actsWithMnemonic()) {
					transaction.sign(input.signatory.signingKey());
				}

				if (input.signatory.actsWithSecondaryMnemonic()) {
					transaction.sign(input.signatory.signingKey());
					transaction.secondSign(input.signatory.confirmKey());
				}

				if (input.signatory.actsWithWif()) {
					transaction.signWithWif(input.signatory.signingKey());
				}

				if (input.signatory.actsWithSecondaryWif()) {
					transaction.signWithWif(input.signatory.signingKey());
					transaction.secondSignWithWif(input.signatory.confirmKey());
				}
			}

			const signedTransaction = transaction.build().toJson();

			return this.dataTransferObjectService.signedTransaction(
				signedTransaction.id,
				signedTransaction,
				signedTransaction,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
