import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr, BigNumber } from "@arkecosystem/platform-sdk-support";
import TronWeb from "tronweb";

import { SignedTransactionData } from "../dto";
import { Address } from "./identity/address";
import { PrivateKey } from "./identity/private-key";

export class TransactionService implements Contracts.TransactionService {
	readonly #config: Coins.Config;
	readonly #connection: TronWeb;
	readonly #address: Address;
	readonly #privateKey: PrivateKey;

	private constructor({ config, peer }) {
		this.#config = config;
		this.#connection = new TronWeb({
			fullHost: peer,
		});
		this.#address = new Address(config);
		this.#privateKey = new PrivateKey(config);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		try {
			return new TransactionService({
				config,
				peer: config.get<string>("peer"),
			});
		} catch {
			return new TransactionService({
				config,
				peer: Arr.randomElement(config.get<string[]>("network.networking.hosts")),
			});
		}
	}

	public async __destruct(): Promise<void> {
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

			const transaction = await this.#connection.transactionBuilder.sendTrx(
				input.data.to,
				BigNumber.make(input.data.amount).times(1e6).toString(),
				await this.#address.fromMnemonic(input.sign.mnemonic),
				1,
			);

			const response = await this.#connection.trx.sign(
				transaction,
				await this.#privateKey.fromMnemonic(input.sign.mnemonic),
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
