import { Transactions } from "@arkecosystem/crypto";
import { MultiSignatureSigner } from "@arkecosystem/multi-signature";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto/signed-transaction";
import { applyCryptoConfiguration } from "./helpers";
import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #http: Contracts.HttpClient;
	readonly #identity: IdentityService;
	readonly #peer: string;
	readonly #multiSignatureSigner: MultiSignatureSigner;
	readonly #configCrypto: any;

	private constructor({ http, identity, peer, multiSignatureSigner, configCrypto }) {
		this.#http = http;
		this.#identity = identity;
		this.#peer = peer;
		this.#multiSignatureSigner = multiSignatureSigner;
		this.#configCrypto = configCrypto;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		const { crypto, peer, status }: any = config.get(Coins.ConfigKey.NetworkConfiguration);

		return new TransactionService({
			http: config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient),
			peer,
			identity: await IdentityService.__construct(config),
			multiSignatureSigner: new MultiSignatureSigner(crypto, status.height),
			configCrypto: { crypto, status },
		});
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("transfer", input, options, ({ transaction, data }) => {
			transaction.recipientId(data.to);

			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("secondSignature", input, options, ({ transaction, data }) =>
			transaction.signatureAsset(BIP39.normalize(data.mnemonic)),
		);
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("delegateRegistration", input, options, ({ transaction, data }) =>
			transaction.usernameAsset(data.username),
		);
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("vote", input, options, ({ transaction, data }) => {
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

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("multiSignature", input, options, ({ transaction, data }) => {
			transaction.multiSignatureAsset({
				publicKeys: data.publicKeys,
				min: data.min,
			});

			transaction.senderPublicKey(data.senderPublicKey);
		});
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("ipfs", input, options, ({ transaction, data }) => transaction.ipfsAsset(data.hash));
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("multiPayment", input, options, ({ transaction, data }) => {
			for (const payment of data.payments) {
				transaction.addPayment(payment.to, payment.amount);
			}

			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("delegateResignation", input, options);
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("htlcLock", input, options, ({ transaction, data }) => {
			transaction.amount(data.amount);

			transaction.recipientId(data.to);

			transaction.htlcLockAsset({
				secretHash: data.secretHash,
				expiration: data.expiration,
			});
		});
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("htlcClaim", input, options, ({ transaction, data }) =>
			transaction.htlcClaimAsset({
				lockTransactionId: data.lockTransactionId,
				unlockSecret: data.unlockSecret,
			}),
		);
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("htlcRefund", input, options, ({ transaction, data }) =>
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
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		applyCryptoConfiguration(this.#configCrypto);

		let keys: Contracts.KeyPair | undefined;

		if (input.signatory.actsWithMnemonic()) {
			keys = await this.#identity.keys().fromMnemonic(input.signatory.signingKey());
		}

		if (input.signatory.actsWithWif()) {
			keys = await this.#identity.keys().fromWIF(input.signatory.signingKey());
		}

		if (!keys) {
			throw new Error("Failed to retrieve the keys for the signatory wallet.");
		}

		const transactionWithSignature = this.#multiSignatureSigner.addSignature(transaction, {
			publicKey: keys.publicKey,
			privateKey: keys.privateKey!,
			compressed: true,
		});

		return new SignedTransactionData(
			transactionWithSignature.id!,
			transactionWithSignature,
			transactionWithSignature,
		);
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		const { data: blockchain } = (await this.#http.get(`${this.#peer}/blockchain`)).json();
		const { data: configuration } = (await this.#http.get(`${this.#peer}/node/configuration`)).json();

		return BigNumber.make(blockchain.block.height)
			.plus(value || 5 * configuration.constants.activeDelegates)
			.toString();
	}

	private async createFromData(
		type: string,
		input: Contracts.TransactionInputs,
		options?: Contracts.TransactionOptions,
		callback?: Function,
	): Promise<Contracts.SignedTransactionData> {
		applyCryptoConfiguration(this.#configCrypto);

		try {
			let address: string | undefined;

			if (input.signatory.actsWithMnemonic()) {
				address = await this.#identity.address().fromMnemonic(input.signatory.signingKey());
			}

			if (input.signatory.actsWithWif()) {
				address = await this.#identity.address().fromWIF(input.signatory.signingKey());
			}

			const transaction = Transactions.BuilderFactory[type]().version(2);

			if (input.signatory.actsWithSenderPublicKey()) {
				address = await this.#identity.address().fromPublicKey(input.signatory.signingKey());

				transaction.senderPublicKey(input.signatory.signingKey());
			}

			if (input.nonce) {
				transaction.nonce(input.nonce);
			} else {
				const body: any = (await this.#http.get(`${this.#peer}/wallets/${address}`)).json();

				transaction.nonce(BigNumber.make(body.data.nonce).plus(1).toFixed());
			}

			if (input.data && input.data.amount) {
				transaction.amount(input.data.amount);
			}

			if (input.fee) {
				transaction.fee(input.fee);
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

			if (options && options.unsignedJson === true) {
				return transaction.toJson();
			}

			if (options && options.unsignedBytes === true) {
				const signedTransaction = Transactions.Serializer.getBytes(transaction.data, {
					excludeSignature: true,
					excludeSecondSignature: true,
				}).toString("hex");

				return new SignedTransactionData(uuidv4(), signedTransaction, signedTransaction);
			}

			if (input.signatory.actsWithMultiSignature()) {
				return this.handleMultiSignature(transaction, input);
			}

			if (input.signatory.actsWithMultiMnemonic() && Array.isArray(input.signatory.signingKeys())) {
				const signingKeys: string[] = input.signatory.signingKeys();

				const senderPublicKeys: string[] = await Promise.all(
					signingKeys.map((mnemonic: string) => this.#identity.publicKey().fromMnemonic(mnemonic)),
				);

				transaction.senderPublicKey(
					await this.#identity.publicKey().fromMultiSignature(signingKeys.length, senderPublicKeys),
				);

				for (let i = 0; i < signingKeys.length; i++) {
					transaction.multiSign(BIP39.normalize(signingKeys[i]), i);
				}
			} else if (input.signatory.actsWithSignature()) {
				transaction.data.signature = input.signatory.signingKey();
			} else {
				if (!address) {
					throw new Error("Failed to retrieve the address for the signatory wallet.");
				}

				if (input.signatory.identifier() !== address) {
					throw new Error(
						`Signatory should be [${input.signatory.identifier()}] but is [${address}]. Please ensure that the expected and actual signatory match.`,
					);
				}

				if (input.signatory.actsWithMnemonic()) {
					transaction.sign(input.signatory.signingKey());
				}

				if (input.signatory.actsWithSecondaryMnemonic()) {
					transaction.secondSign(input.signatory.confirmKey());
				}

				if (input.signatory.actsWithWif()) {
					transaction.signWithWif(input.signatory.signingKey());
				}

				if (input.signatory.actsWithSecondaryWif()) {
					transaction.secondSignWithWif(input.signatory.confirmKey());
				}
			}

			const signedTransaction = transaction.build().toJson();

			return new SignedTransactionData(signedTransaction.id, signedTransaction, signedTransaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	private async handleMultiSignature(transaction: Contracts.RawTransactionData, input: Contracts.TransactionInputs) {
		// @TODO: use correct type, maybe split methods to signingKey/signingKeys/signingPair
		const transactionWithSignature = this.#multiSignatureSigner.sign(
			transaction,
			input.signatory.signingKeys() as any,
		);

		return new SignedTransactionData(
			transactionWithSignature.id!,
			transactionWithSignature,
			transactionWithSignature,
		);
	}
}
