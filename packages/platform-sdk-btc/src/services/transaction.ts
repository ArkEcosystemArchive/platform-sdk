import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";
import { Transaction } from "bitcore-lib";
import { ClientService } from "./client";
import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
	readonly #client;
	readonly #identity;

	private constructor (opts: Contracts.KeyValuePair) {
		this.#client = opts.client;
		this.#identity = opts.identity;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<TransactionService> {
		return new TransactionService({
			client: await ClientService.construct(opts),
			identity: await IdentityService.construct(opts),
		});
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		const senderAddress: string = await this.#identity.address({ wif: input.sign.passphrase })

		// Load unpsent tx outs from json-rpc
		const unspentTxOuts = await this.unspentTxOuts(senderAddress)

		// const dynamicFeePerByte: number = BigNumber.make(input.fee).times(1e8);
		const amount: BigNumber = BigNumber.make(input.data.amount).times(1e8);

		// Estimate total amount
		// const estimatedMinerFee: number = this.calculateTransactionFee(unspentTxOuts.length, 2, dynamicFeePerByte)
		const estimatedMinerFee: BigNumber = BigNumber.make(1e8) // await this.estimateFee()
		const estimatedTotal: BigNumber = amount.plus(estimatedMinerFee);

		// Check if balance is sufficient
		const unspentTxOutsTotal = unspentTxOuts.reduce((total, tx) => total.plus(BigNumber.make(tx.amount * 1e8)), BigNumber.ZERO);

		if (unspentTxOutsTotal.isLessThan(estimatedTotal)) {
			throw new Error('Insufficient balance');
		}

		// Find unspentTxOutsto spend for this transaction
		let txOutIndex: number = 0;
		let sumOfConsumedOutputs: BigNumber = BigNumber.ZERO;
		const txOutsToConsume = [];

		while (sumOfConsumedOutputs.isLessThan(estimatedTotal)) {
			const tx = unspentTxOuts[txOutIndex];
			// @ts-ignore
			txOutsToConsume.push(tx);
			txOutIndex += 1;
			sumOfConsumedOutputs += tx.amount;
		}

		// Calculate fee
		// const calculatedMinerFee = this.calculateTransactionFee(txOutsToConsume.length, 2, dynamicFeePerByte);
		const calculatedMinerFee = 0;

		// Calculate total
		const calculatedTotal: number = BigNumber.make(input.data.amount).plus(calculatedMinerFee).toFixed() as unknown as number;

		return new Transaction()
			.from(unspentTxOuts)
			.to(input.data.to, calculatedTotal)
			.change(senderAddress)
			.sign(input.sign.passphrase)
			.toString();
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	private async estimateFee(credentials: string): Promise<string> {
		const { result } = await Utils.postJSON("host", '/', {
			jsonrpc: "2.0",
			method: 'estimatesmartfee',
			params: [1],
		}, {
			'Authorization': `Basic ${credentials}`
		});

		return result.feerate
	}

	private async unspentTxOuts(address: string, credentials: string): Promise<any[]> {
		const { result } = await Utils.postJSON("host", '/', {
			jsonrpc: "2.0",
			method: 'listunspent',
			params: [1, 9999999, [address]],
		}, {
			'Authorization': `Basic ${credentials}`
		});

		return result
	}

	private calculateTransactionFee(inputCount: number, outputCount: number, dynamicFeePerByte: number) {
		return ((inputCount * 180) + (outputCount * 34) + 10 + inputCount) * dynamicFeePerByte;
	}
}
