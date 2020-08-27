import {
	Builders as MagistrateBuilders,
	Transactions as MagistrateTransactions,
} from "@arkecosystem/core-magistrate-crypto";
import { Enums } from "@arkecosystem/core-magistrate-crypto";
import { Managers, Transactions } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Arr, BigNumber } from "@arkecosystem/platform-sdk-support";

import { PendingMultiSignature } from "../dto/pending-multi-signature";
import { SignedTransactionData } from "../dto/signed-transaction";
import { IdentityService } from "./identity";

Transactions.TransactionRegistry.registerTransactionType(MagistrateTransactions.EntityTransaction);

const ucfirst = (value: string): string => value?.charAt(0).toUpperCase() + value?.slice(1);

export class TransactionService implements Contracts.TransactionService {
	readonly #http: Contracts.HttpClient;
	readonly #identity: IdentityService;
	readonly #peer: string;

	readonly #magistrateBuilders = {
		entityRegistration: MagistrateBuilders.EntityBuilder,
		entityResignation: MagistrateBuilders.EntityBuilder,
		entityUpdate: MagistrateBuilders.EntityBuilder,
	};

	private constructor({ http, identity, peer }) {
		this.#http = http;
		this.#identity = identity;
		this.#peer = peer;
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		const http: Contracts.HttpClient = config.get<Contracts.HttpClient>("httpClient");

		let peer: string;
		try {
			peer = config.get<string>("peer");
		} catch {
			peer = `${Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts)}/api`;
		}

		const crypto: any = (await http.get(`${peer}/node/configuration/crypto`)).json();
		Managers.configManager.setConfig(crypto.data);

		const status: any = (await http.get(`${peer}/node/syncing`)).json();
		Managers.configManager.setHeight(status.data.height);

		return new TransactionService({
			http,
			peer,
			identity: await IdentityService.construct(config),
		});
	}

	public async destruct(): Promise<void> {
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
		return this.createFromData("vote", input, options, ({ transaction, data }) =>
			transaction.votesAsset([data.vote]),
		);
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

	public async entityRegistration(
		input: Contracts.EntityRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("entityRegistration", input, options, ({ transaction, data }) =>
			transaction.asset({
				type: Enums.EntityType[ucfirst(data.type)],
				subType: Enums.EntitySubType[ucfirst(data.subType)] || Enums.EntitySubType.None,
				action: Enums.EntityAction.Register,
				data: { name: data.name, ipfsData: data.ipfs },
			}),
		);
	}

	public async entityResignation(
		input: Contracts.EntityResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("entityResignation", input, options, ({ transaction, data }) => {
			transaction.asset({
				type: Enums.EntityType[ucfirst(data.type)],
				subType: Enums.EntitySubType[ucfirst(data.subType)] || Enums.EntitySubType.None,
				action: Enums.EntityAction.Resign,
				registrationId: data.registrationId,
				data: {},
			});
		});
	}

	public async entityUpdate(
		input: Contracts.EntityUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		return this.createFromData("entityUpdate", input, options, ({ transaction, data }) =>
			transaction.asset({
				type: Enums.EntityType[ucfirst(data.type)],
				subType: Enums.EntitySubType[ucfirst(data.subType)] || Enums.EntitySubType.None,
				action: Enums.EntityAction.Update,
				registrationId: data.registrationId,
				data: { name: data.name, ipfsData: data.ipfs },
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
		let keys: Contracts.KeyPair | undefined;

		if (input.sign.mnemonic) {
			keys = await this.#identity.keys().fromMnemonic(BIP39.normalize(input.sign.mnemonic));
		}

		if (input.sign.wif) {
			keys = await this.#identity.keys().fromWIF(input.sign.wif);
		}

		if (!keys) {
			throw new Error("Failed to retrieve the keys for the signatory wallet.");
		}

		const pendingMultiSignature = new PendingMultiSignature(transaction);

		const isReady = pendingMultiSignature.isMultiSignatureReady(true);

		if (!isReady) {
			const index: number = transaction.multiSignature.publicKeys.indexOf(keys.publicKey);

			if (index === -1) {
				throw new Error("passphrase/wif is not used to sign this transaction");
			}

			Transactions.Signer.multiSign(
				transaction,
				{ publicKey: keys.publicKey, privateKey: keys.privateKey!, compressed: true },
				index,
			);

			transaction.signatures = transaction.signatures.filter(
				(value, index, self) => self.indexOf(value) === index,
			);
		} else if (pendingMultiSignature.needsWalletSignature(keys.publicKey)) {
			// TODO: clean up this part in a follow up PR
			Transactions.Signer.sign(transaction, {
				publicKey: keys.publicKey,
				privateKey: keys.privateKey!,
				compressed: true,
			});

			if (input.sign.secondMnemonic) {
				const secondaryKeys = await this.#identity
					.keys()
					.fromMnemonic(BIP39.normalize(input.sign.secondMnemonic));

				Transactions.Signer.secondSign(transaction, {
					publicKey: secondaryKeys.publicKey,
					privateKey: secondaryKeys.privateKey!,
					compressed: true,
				});
			}

			transaction.id = Transactions.Utils.getId(transaction);
		}

		return new SignedTransactionData(transaction.id, transaction);
	}

	private async createFromData(
		type: string,
		input: Contracts.TransactionInputs,
		options?: Contracts.TransactionOptions,
		callback?: Function,
	): Promise<Contracts.SignedTransactionData> {
		let address: string | undefined;

		if (input.sign.mnemonic) {
			address = await this.#identity.address().fromMnemonic(BIP39.normalize(input.sign.mnemonic));
		}

		if (input.sign.wif) {
			address = await this.#identity.address().fromWIF(input.sign.wif);
		}

		let transaction;

		if (this.#magistrateBuilders[type]) {
			transaction = new this.#magistrateBuilders[type]();
		} else {
			transaction = Transactions.BuilderFactory[type]().version(2);
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

		if (callback) {
			callback({ transaction, data: input.data });
		}

		if (options && options.unsignedJson === true) {
			return transaction.toJson();
		}

		if (options && options.unsignedBytes === true) {
			return new SignedTransactionData(
				// TODO: compute ID
				"dummy",
				Transactions.Serializer.getBytes(transaction, {
					excludeSignature: true,
					excludeSecondSignature: true,
				}).toString("hex"),
			);
		}

		if (input.sign.multiSignature) {
			return this.handleMultiSignature(transaction, input);
		}

		if (Array.isArray(input.sign.mnemonics)) {
			const senderPublicKeys: string[] = await Promise.all(
				input.sign.mnemonics.map((mnemonic: string) => this.#identity.publicKey().fromMnemonic(mnemonic)),
			);

			transaction.senderPublicKey(
				await this.#identity.publicKey().fromMultiSignature(input.sign.mnemonics.length, senderPublicKeys),
			);

			for (let i = 0; i < input.sign.mnemonics.length; i++) {
				transaction.multiSign(BIP39.normalize(input.sign.mnemonics[i]), i);
			}
		} else {
			if (!address) {
				throw new Error(
					`Failed to retrieve the nonce for the signatory wallet. Please provide one through the [input] parameter.`,
				);
			}

			if (input.from !== address) {
				throw new Error(
					`Signatory should be [${input.from}] but is [${address}]. Please ensure that the expected and actual signatory match.`,
				);
			}

			if (input.sign.mnemonic) {
				transaction.sign(BIP39.normalize(input.sign.mnemonic));
			}

			if (input.sign.secondMnemonic) {
				transaction.secondSign(BIP39.normalize(input.sign.secondMnemonic));
			}

			if (input.sign.wif) {
				transaction.signWithWif(input.sign.wif);
			}

			if (input.sign.secondWif) {
				transaction.secondSignWithWif(input.sign.secondWif);
			}
		}

		const signedTransaction = transaction.build().toJson();

		return new SignedTransactionData(signedTransaction.id, signedTransaction);
	}

	private async handleMultiSignature(transaction: Contracts.RawTransactionData, input: Contracts.TransactionInputs) {
		// @ts-ignore
		const { multiSignature } = input.sign;

		let senderPublicKey: string | undefined = undefined;

		if (multiSignature.mnemonic) {
			senderPublicKey = await this.#identity.publicKey().fromMnemonic(BIP39.normalize(multiSignature.mnemonic));
		}

		if (multiSignature.wif) {
			senderPublicKey = await this.#identity.publicKey().fromWIF(multiSignature.wif);
		}

		const publicKeyIndex: number = multiSignature.publicKeys.indexOf(senderPublicKey);

		transaction.senderPublicKey(senderPublicKey);

		if (publicKeyIndex > -1) {
			if (multiSignature.mnemonic) {
				transaction.multiSign(multiSignature.mnemonic, publicKeyIndex);
			}
		} else if (transaction.data.type === 4 && !transaction.data.signatures) {
			transaction.data.signatures = [];
		}

		if (!transaction.data.senderPublicKey) {
			transaction.senderPublicKey(
				await this.#identity.publicKey().fromMultiSignature(multiSignature.min, multiSignature.publicKeys),
			);
		}

		const transactionJSON = transaction.data.type === 4 ? transaction.getStruct() : transaction.build().toJson();
		transactionJSON.multiSignature = multiSignature;

		if (!transactionJSON.signatures) {
			transactionJSON.signatures = [];
		}

		delete transactionJSON.multiSignature.mnemonic;

		return new SignedTransactionData(transactionJSON.id, transactionJSON);
	}
}
