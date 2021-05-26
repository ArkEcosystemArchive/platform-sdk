import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Stellar from "stellar-sdk";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #client;
	readonly #networkPassphrase;
	readonly #identity: IdentityService;

	readonly #networks = {
		mainnet: {
			host: "https://horizon.stellar.org",
			networkPassphrase: Stellar.Networks.MAINNET,
		},
		testnet: {
			host: "https://horizon-testnet.stellar.org",
			networkPassphrase: Stellar.Networks.TESTNET,
		},
	};

	private constructor(options) {
		const network = this.#networks[options.network.id.split(".")[1]];

		this.#client = new Stellar.Server(network.host);
		this.#networkPassphrase = network.networkPassphrase;
		this.#identity = options.identity;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService({
			network: config.get<Coins.NetworkManifest>("network"),
			identity: await IdentityService.__construct(config),
		});
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Error("No mnemonic provided.");
			}

			let keyPair;

			if (input.signatory.actsWithPrivateKey()) {
				keyPair = await this.#identity.keyPair().fromPrivateKey(input.signatory.signingKey());
			} else {
				keyPair = await this.#identity.keyPair().fromMnemonic(input.signatory.signingKey());
			}

			const { publicKey, privateKey } = keyPair;

			const account = await this.#client.loadAccount(publicKey);

			const transaction = new Stellar.TransactionBuilder(account, {
				fee: input.fee || Stellar.BASE_FEE,
				networkPassphrase: this.#networkPassphrase,
			})
				.addOperation(
					Stellar.Operation.payment({
						destination: input.data.to,
						asset: Stellar.Asset.native(),
						amount: `${input.data.amount}`,
					}),
				)
				.setTimeout(30) // todo: support expiration
				.build();

			transaction.sign(Stellar.Keypair.fromSecret(privateKey));

			return new SignedTransactionData(uuidv4(), transaction, transaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}
}
