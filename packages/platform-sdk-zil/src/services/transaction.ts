import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BN, Long, units, Zilliqa } from "@zilliqa-js/zilliqa";

import { SignedTransactionData } from "../dto";
import { convertZilToQa, getZilliqa, getZilliqaVersion } from "../zilliqa";

export class TransactionService implements Contracts.TransactionService {
	readonly #zilliqa: Zilliqa;
	readonly #version: number;

	private constructor(config: Coins.Config) {
		this.#zilliqa = getZilliqa(config);
		this.#version = getZilliqaVersion(config);
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
		if (!input.data.to) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "data.to");
		}

		if (input.fee === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "fee");
		}

		if (input.feeLimit === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "feeLimit");
		}

		if (input.nonce === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "nonce");
		}

		if (!input.sign.mnemonic) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "sign.mnemonic");
		}

		const address = this.#zilliqa.wallet.addByMnemonic(input.sign.mnemonic);
		const { publicKey, bech32Address } = this.#zilliqa.wallet.accounts[address];
		if (bech32Address !== input.from) {
			throw new Exceptions.Exception(
				`Sender address (${input.from}) must match signer address (${bech32Address})`,
			);
		}

		const amount = convertZilToQa(input.data.amount);
		const fee = units.toQa(input.fee, units.Units.Li).toString();
		const signedData = {
			address,
			recipient: input.data.to,
			amount,
			fee,
		};

		const transaction = this.#zilliqa.transactions.new({
			version: this.#version,
			pubKey: publicKey,
			toAddr: input.data.to,
			amount: new BN(convertZilToQa(input.data.amount)),
			gasPrice: new BN(units.toQa(input.fee, units.Units.Li)),
			gasLimit: Long.fromString(input.feeLimit),
			data: input.data.memo,
			nonce: new BN(input.nonce).toNumber(),
		});

		const signedTransaction = await this.#zilliqa.wallet.signWith(transaction, address, true);
		const broadcastData = JSON.stringify({ ...signedTransaction.payload, version: this.#version });

		return new SignedTransactionData(signedTransaction.hash, signedData, broadcastData);
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secondSignature.name);
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.vote.name);
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.ipfs.name);
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiPayment.name);
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateResignation.name);
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.htlcLock.name);
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.htlcClaim.name);
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.htlcRefund.name);
	}

	public async multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSign.name);
	}

	public async estimateExpiration(value?: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.estimateExpiration.name);
	}
}
