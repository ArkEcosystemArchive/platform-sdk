import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { UUID } from "@arkecosystem/platform-sdk-crypto";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { RippleAPI } from "ripple-lib";

import { SignedTransactionData } from "../dto";

export class TransactionService implements Contracts.TransactionService {
	readonly #config: Coins.Config;
	readonly #http: Contracts.HttpClient;
	readonly #ripple: RippleAPI;

	private constructor(config: Coins.Config) {
		this.#config = config;
		this.#http = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);
		this.#ripple = new RippleAPI();
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
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

			const prepared = await this.#ripple.preparePayment(
				input.signatory.identifier(),
				{
					source: {
						address: input.signatory.identifier(),
						maxAmount: {
							value: `${input.data.amount}`,
							currency: "XRP",
						},
					},
					destination: {
						address: input.data.to,
						amount: {
							value: `${input.data.amount}`,
							currency: "XRP",
						},
					},
				},
				{ maxLedgerVersionOffset: 5 },
			);

			const { id, signedTransaction } = await this.post("sign", [
				{
					tx_json: prepared.txJSON,
					secret: input.signatory.signingKey(),
				},
			]);

			return new SignedTransactionData(id, signedTransaction, signedTransaction);
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

	private async post(method: string, params: any[]): Promise<Contracts.KeyValuePair> {
		console.log(
			(
				await this.#http.post(Arr.randomElement(this.#config.get<string[]>("network.networking.hosts")), {
					jsonrpc: "2.0",
					id: UUID.random(),
					method,
					params,
				})
			).body(),
		);
		return (
			await this.#http.post(Arr.randomElement(this.#config.get<string[]>("network.networking.hosts")), {
				jsonrpc: "2.0",
				id: UUID.random(),
				method,
				params,
			})
		).json().result;
	}
}
