import { Connection } from "@arkecosystem/client";
import { Managers, Transactions } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Arr, BigNumber } from "@arkecosystem/platform-sdk-support";

import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: Connection;
	readonly #identity: IdentityService;

	private constructor({ connection, identity }) {
		this.#connection = connection;
		this.#identity = identity;
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		let connection: Connection;
		try {
			connection = new Connection(config.get<string>("peer"));
		} catch {
			connection = new Connection(`${Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts)}/api`);
		}

		const { body: crypto } = await connection.api("node").crypto();
		Managers.configManager.setConfig(crypto.data as any);

		const { body: status } = await connection.api("node").syncing();
		Managers.configManager.setHeight(status.data.height);

		return new TransactionService({
			connection,
			identity: await IdentityService.construct(config),
		});
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
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
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("secondSignature", input, options, ({ transaction, data }) =>
			transaction.signatureAsset(BIP39.normalize(data.passphrase)),
		);
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("delegateRegistration", input, options, ({ transaction, data }) =>
			transaction.usernameAsset(data.username),
		);
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("vote", input, options, ({ transaction, data }) =>
			transaction.votesAsset([data.vote]),
		);
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
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
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("ipfs", input, options, ({ transaction, data }) => transaction.ipfsAsset(data.hash));
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("multiPayment", input, options, ({ transaction, data }) => {
			for (const payment of data.payments) {
				transaction.addPayment(payment.to, payment.amount);
			}
		});
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("delegateResignation", input, options);
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
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
	): Promise<Contracts.SignedTransaction> {
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
	): Promise<Contracts.SignedTransaction> {
		return this.createFromData("htlcRefund", input, options, ({ transaction, data }) =>
			transaction.htlcRefundAsset({
				lockTransactionId: data.lockTransactionId,
			}),
		);
	}

	private async createFromData(
		type: string,
		input: Contracts.KeyValuePair,
		options?: Contracts.TransactionOptions,
		callback?: Function,
	): Promise<Contracts.SignedTransaction> {
		const transaction = Transactions.BuilderFactory[type]().version(2);

		if (input.nonce) {
			transaction.nonce(input.nonce);
		} else {
			let address: string | undefined;

			if (input.sign.passphrase) {
				address = await this.#identity.address().fromPassphrase(BIP39.normalize(input.sign.passphrase));
			}

			if (input.sign.wif) {
				address = await this.#identity.address().fromWIF(input.sign.wif);
			}

			if (!address) {
				throw new Error(
					`Failed to retrieve the nonce for the signer wallet. Please provide one through the [input] parameter.`,
				);
			}

			const { body } = await this.#connection.api("wallets").get(address);

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
			return Transactions.Serializer.getBytes(transaction, {
				excludeSignature: true,
				excludeSecondSignature: true,
			}).toString("hex");
		}

		if (Array.isArray(input.sign.passphrases)) {
			for (let i = 0; i < input.sign.passphrases.length; i++) {
				transaction.multiSign(BIP39.normalize(input.sign.passphrases[i]), i);
			}
		}

		if (input.sign.passphrase) {
			transaction.sign(BIP39.normalize(input.sign.passphrase));
		}

		if (input.sign.secondPassphrase) {
			transaction.secondSign(BIP39.normalize(input.sign.secondPassphrase));
		}

		if (input.sign.wif) {
			transaction.signWithWif(input.sign.wif);
		}

		if (input.sign.secondWif) {
			transaction.secondSignWithWif(input.sign.secondWif);
		}

		return transaction.build().toJson();
	}
}
