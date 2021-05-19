import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { UUID } from "@arkecosystem/platform-sdk-crypto";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { LCDClient, MnemonicKey, MsgSend } from "@terra-money/terra.js";

import { SignedTransactionData } from "../dto";
import { useClient } from "./helpers";

export class TransactionService implements Contracts.TransactionService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
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
		const transaction = await this.useClient()
			.wallet(
				new MnemonicKey({
					mnemonic: input.signatory.signingKey(),
				}),
			)
			.createAndSignTx({
				msgs: [new MsgSend(input.signatory.identifier(), input.data.to, { uluna: input.data.amount })],
				memo: input.data.memo,
			});

		return new SignedTransactionData(UUID.random(), transaction.toData(), transaction.toJSON());
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

	private useClient(): LCDClient {
		return useClient(
			`${Arr.randomElement(this.#config.get<string[]>("network.networking.hosts"))}/api`,
			this.#config.get(Coins.ConfigKey.CryptoChainId),
		);
	}
}
