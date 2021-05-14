import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { computeWork } from "nanocurrency";
import { block } from "nanocurrency-web";

import { SignedTransactionData } from "../dto";
import { deriveAccount } from "./identity/helpers";
import { getPeerFromConfig } from "./peer-host";
import { NanoClient } from "./rpc";

export class TransactionService implements Contracts.TransactionService {
	readonly #client: NanoClient;

	public constructor(client: NanoClient) {
		this.#client = client;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		const client = new NanoClient(getPeerFromConfig(config));
		return new TransactionService(client);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (!input.sign.mnemonic) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "sign.mnemonic");
		}

		const { address, privateKey } = deriveAccount(input.sign.mnemonic);
		const { balance, representative, frontier } = await this.#client.accountInfo(address)

		const data = {
			// Current balance from wallet info
			walletBalanceRaw: balance,
			// Your wallet address
			fromAddress: input.from,
			// The address to send to
			toAddress: input.data.to,
			// From wallet info
			representativeAddress: representative,
			// Previous block, from wallet info
			frontier,
			// The amount to send in RAW
			amountRaw: input.data.amount,
			// Generate work on server-side or with a DPOW service
			work: (await computeWork(frontier))!,
		};

		return new SignedTransactionData(block.send(data, privateKey).signature, data, data);
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

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}
}
