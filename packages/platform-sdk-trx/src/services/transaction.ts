import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import TronWeb from "tronweb";

import { SignedTransactionData } from "../dto";
import { AddressService } from "./identity/address";
import { PrivateKeyService } from "./identity/private-key";

export class TransactionService implements Contracts.TransactionService {
	readonly #connection: TronWeb;
	readonly #address: AddressService;
	readonly #privateKey: PrivateKeyService;

	private constructor({ config, peer }) {
		this.#connection = new TronWeb({
			fullHost: peer,
		});
		this.#address = new AddressService(config);
		this.#privateKey = new PrivateKeyService(config);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService({
			config,
			peer: Helpers.randomHostFromConfig(config, "full").host,
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

			const { address: senderAddress } = await this.#address.fromMnemonic(input.signatory.signingKey());

			if (senderAddress === input.data.to) {
				throw new Exceptions.InvalidRecipientException("Cannot transfer TRX to the same account.");
			}

			let transaction = await this.#connection.transactionBuilder.sendTrx(
				input.data.to,
				BigNumber.make(input.data.amount).divide(1e8).times(1e6).toString(),
				senderAddress,
				1,
			);

			if (input.data.memo) {
				transaction = await this.#connection.transactionBuilder.addUpdateData(
					transaction,
					input.data.memo,
					"utf8",
				);
			}

			const response = await this.#connection.trx.sign(
				transaction,
				(await this.#privateKey.fromMnemonic(input.signatory.signingKey())).privateKey,
			);

			return new SignedTransactionData(response.txID, response, response);
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
