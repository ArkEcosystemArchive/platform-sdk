import { Coins, Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { RippleAPI } from "ripple-lib";

import { SignedTransactionData } from "../dto";
import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: RippleAPI;

	private constructor(connection: RippleAPI) {
		this.#connection = connection;
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		let connection: RippleAPI;
		try {
			connection = new RippleAPI({ server: config.get<string>("peer") });
		} catch {
			connection = new RippleAPI({
				server: Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts),
			});
		}

		await connection.connect();

		return new TransactionService(connection);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (!input.sign.mnemonic) {
				throw new Error("No mnemonic provided.");
			}

			const sender: string = await new IdentityService().address().fromMnemonic(input.sign.mnemonic);

			const prepared = await this.#connection.preparePayment(
				sender,
				{
					source: {
						address: sender,
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

			const { id, signedTransaction } = this.#connection.sign(
				prepared.txJSON,
				BIP39.normalize(input.sign.mnemonic),
			);

			return new SignedTransactionData(id, signedTransaction);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
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

	public async entityRegistration(
		input: Contracts.EntityRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "entityRegistration");
	}

	public async entityResignation(
		input: Contracts.EntityResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "entityResignation");
	}

	public async entityUpdate(
		input: Contracts.EntityUpdateInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "entityUpdate");
	}

	public multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}
}
