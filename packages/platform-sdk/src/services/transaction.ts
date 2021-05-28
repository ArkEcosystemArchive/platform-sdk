/* istanbul ignore file */

import {
	IdentityOptions,
	TransactionService as Contract,
	TransferInput,
	TransactionOptions,
	SignedTransactionData,
	SecondSignatureInput,
	DelegateRegistrationInput,
	VoteInput,
	MultiSignatureInput,
	IpfsInput,
	MultiPaymentInput,
	DelegateResignationInput,
	HtlcLockInput,
	HtlcClaimInput,
	HtlcRefundInput,
	RawTransactionData,
	TransactionInputs,
} from "../contracts";
import { NotImplemented } from "../exceptions";

export abstract class AbstractTransactionService implements Contract {
	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(input: TransferInput, options?: TransactionOptions): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "transfer");
	}

	public async secondSignature(
		input: SecondSignatureInput,
		options?: TransactionOptions,
	): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: DelegateRegistrationInput,
		options?: TransactionOptions,
	): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(input: VoteInput, options?: TransactionOptions): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: MultiSignatureInput,
		options?: TransactionOptions,
	): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(input: IpfsInput, options?: TransactionOptions): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(input: MultiPaymentInput, options?: TransactionOptions): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: DelegateResignationInput,
		options?: TransactionOptions,
	): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(input: HtlcLockInput, options?: TransactionOptions): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(input: HtlcClaimInput, options?: TransactionOptions): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(input: HtlcRefundInput, options?: TransactionOptions): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "htlcRefund");
	}

	public async multiSign(transaction: RawTransactionData, input: TransactionInputs): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}
}
