import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

import { createValue, getCip1852Account } from "./transaction.helpers";

export class TransactionService implements Contracts.TransactionService {
	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
		// @ts-ignore
	): Promise<Contracts.SignedTransactionData> {
		if (input.sign.mnemonic === undefined) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "transfer");
		}

		if (input.data.expiration === undefined) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "transfer");
		}

		const txBuilder = CardanoWasm.TransactionBuilder.new(
			// all of these are taken from the mainnet genesis settings
			CardanoWasm.LinearFee.new(CardanoWasm.BigNum.from_str("44"), CardanoWasm.BigNum.from_str("155381")),
			CardanoWasm.BigNum.from_str("1000000"),
			CardanoWasm.BigNum.from_str("500000000"),
			CardanoWasm.BigNum.from_str("2000000"),
		);

		const address = CardanoWasm.ByronAddress.from_base58(
			"Ae2tdPwUPEZLs4HtbuNey7tK4hTKrwNwYtGqp7bDfCy2WdR3P6735W5Yfpe",
		);
		txBuilder.add_bootstrap_input(
			address,
			CardanoWasm.TransactionInput.new(
				CardanoWasm.TransactionHash.from_bytes(
					Buffer.from("488afed67b342d41ec08561258e210352fba2ac030c98a8199bc22ec7a27ccf1", "hex"),
				),
				0, // index
			),
			createValue("3000000"),
		);

		txBuilder.add_output(
			CardanoWasm.TransactionOutput.new(
				address.to_address(),
				// we can construct BigNum (Coin) from both a js BigInt (here) or from a string (below in fee)
				createValue("1000000"),
			),
		);

		if (input.data.expiration) {
			// @TODO: estimate this
			txBuilder.set_ttl(input.data.expiration);
		}

		// calculate the min fee required and send any change to an address
		txBuilder.add_change_if_needed(
			CardanoWasm.ByronAddress.from_base58(
				"Ae2tdPwUPEYxiWbAt3hUCJsZ9knze88qNhuTQ1MGCKqsVFo5ddNyoTDBymr",
			).to_address(),
		);

		const txBody = txBuilder.build();
		const txHash = CardanoWasm.hash_transaction(txBody);
		const witnesses = CardanoWasm.TransactionWitnessSet.new();
		const bootstrapWitnesses = CardanoWasm.BootstrapWitnesses.new();
		const bootstrapWitness = CardanoWasm.make_icarus_bootstrap_witness(
			txHash,
			address,
			getCip1852Account(input.sign.mnemonic),
		);
		bootstrapWitnesses.add(bootstrapWitness);
		witnesses.set_bootstraps(bootstrapWitnesses);
		const transaction = CardanoWasm.Transaction.new(
			txBody,
			witnesses,
			undefined, // transaction metadata
		);

		const txHex = Buffer.from(transaction.to_bytes()).toString("hex");
		console.log(txHex);
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

	public async multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "estimateExpiration");
	}
}
