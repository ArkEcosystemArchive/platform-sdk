import { Interfaces, Transactions } from "@arkecosystem/crypto";
import { MultiSignatureSigner } from "@arkecosystem/multi-signature";
import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import LedgerTransportNodeHID from "@ledgerhq/hw-transport-node-hid-singleton";

import { Bindings } from "../contracts";
import { applyCryptoConfiguration } from "./helpers";

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

	@IoC.inject(Bindings.Crypto)
	private readonly packageCrypto!: Interfaces.NetworkConfig;

	@IoC.inject(Bindings.Height)
	private readonly packageHeight!: number;

	// @TODO: remove or inject
	#peer!: string;
	#multiSignatureSigner!: MultiSignatureSigner;
	#configCrypto!: { crypto: Interfaces.NetworkConfig; height: number };

	public async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("transfer", input, ({ transaction, data }) => {
			transaction.recipientId(data.to);

			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public async secondSignature(input: Services.SecondSignatureInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("secondSignature", input, ({ transaction, data }) =>
			transaction.signatureAsset(BIP39.normalize(data.mnemonic)),
		);
	}

	public async delegateRegistration(
		input: Services.DelegateRegistrationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("delegateRegistration", input, ({ transaction, data }) =>
			transaction.usernameAsset(data.username),
		);
	}

	public async vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData> {
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

	public async multiSignature(input: Services.MultiSignatureInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("multiSignature", input, ({ transaction, data }) => {
			transaction.multiSignatureAsset({
				publicKeys: data.publicKeys,
				min: data.min,
			});

			transaction.senderPublicKey(data.senderPublicKey);
		});
	}

	public async ipfs(input: Services.IpfsInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("ipfs", input, ({ transaction, data }) => transaction.ipfsAsset(data.hash));
	}

	public async multiPayment(input: Services.MultiPaymentInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("multiPayment", input, ({ transaction, data }) => {
			for (const payment of data.payments) {
				transaction.addPayment(payment.to, Helpers.toRawUnit(payment.amount, this.configRepository).toString());
			}

			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public async delegateResignation(
		input: Services.DelegateResignationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("delegateResignation", input);
	}

	public async htlcLock(input: Services.HtlcLockInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("htlcLock", input, ({ transaction, data }) => {
			transaction.amount(Helpers.toRawUnit(data.amount, this.configRepository).toString());

			transaction.recipientId(data.to);

			transaction.htlcLockAsset({
				secretHash: data.secretHash,
				expiration: data.expiration,
			});
		});
	}

	public async htlcClaim(input: Services.HtlcClaimInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("htlcClaim", input, ({ transaction, data }) =>
			transaction.htlcClaimAsset({
				lockTransactionId: data.lockTransactionId,
				unlockSecret: data.unlockSecret,
			}),
		);
	}

	public async htlcRefund(input: Services.HtlcRefundInput): Promise<Contracts.SignedTransactionData> {
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
	public async multiSign(
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

		const transactionWithSignature = this.#multiSignatureSigner.addSignature(transaction, {
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

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		const { data: blockchain } = (await this.httpClient.get(`${this.#peer}/blockchain`)).json();
		const { data: configuration } = (await this.httpClient.get(`${this.#peer}/node/configuration`)).json();

		return BigNumber.make(blockchain.block.height)
			.plus(value || 5 * configuration.constants.activeDelegates)
			.toString();
	}

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#peer = Helpers.randomHostFromConfig(this.configRepository);
		// @ts-ignore
		this.#multiSignatureSigner = new MultiSignatureSigner(this.packageCrypto, this.packageHeight);
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

			if (input.signatory.actsWithMnemonic() || input.signatory.actsWithPrivateMultiSignature()) {
				address = (await this.addressService.fromMnemonic(input.signatory.signingKey())).address;
			}

			if (input.signatory.actsWithWif()) {
				address = (await this.addressService.fromWIF(input.signatory.signingKey())).address;
			}

			const transaction = Transactions.BuilderFactory[type]().version(2);

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
				transaction.amount(Helpers.toRawUnit(input.data.amount, this.configRepository).toString());
			}

			if (input.fee) {
				transaction.fee(Helpers.toRawUnit(input.fee, this.configRepository).toString());
			}

			if (input.data && input.data.expiration) {
				transaction.expiration(input.data.expiration);
			} else {
				try {
					const estimatedExpiration = await this.estimateExpiration();

					if (estimatedExpiration) {
						transaction.expiration(parseInt(estimatedExpiration));
					}
				} catch {
					// If we fail to estimate the expiration we'll still continue.
				}
			}

			if (callback) {
				callback({ transaction, data: input.data });
			}

			if (input.signatory.actsWithLedger()) {
				await this.ledgerService.connect(LedgerTransportNodeHID);

				transaction.senderPublicKey(await this.ledgerService.getPublicKey(input.signatory.signingKey()));
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
				const transactionWithSignature = this.#multiSignatureSigner.sign(
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
