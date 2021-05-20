import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import {
	Address,
	Balance,
	GasLimit,
	GasPrice,
	Mnemonic,
	Nonce,
	ProxyProvider,
	Transaction,
	TransactionPayload,
	UserSecretKey,
	UserSigner,
} from "@elrondnetwork/erdjs";

import { SignedTransactionData } from "../dto";

export class TransactionService implements Contracts.TransactionService {
	readonly #provider: ProxyProvider;

	private constructor(peer: string) {
		this.#provider = new ProxyProvider(peer);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(Arr.randomElement(config.get<string[]>("network.networking.hosts")));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "sign.mnemonic");
		}

		if (input.fee === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "fee");
		}

		if (input.feeLimit === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "feeLimit");
		}

		if (input.nonce === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "nonce");
		}

		const unsignedTransaction = {
			sender: input.signatory.address(),
			receiver: input.data.to,
			value: Balance.egld(input.data.amount),
			gasPrice: (input.fee as unknown) as number,
			gasLimit: (input.feeLimit as unknown) as number,
			data: input.data.memo,
		};

		const mnemonic: Mnemonic = Mnemonic.fromString(input.signatory.signingKey());
		const secretKey: UserSecretKey = mnemonic.deriveKey(0); // TODO probably need to consider account index for all bip44 wallets
		const signer: UserSigner = new UserSigner(secretKey);

		const transaction: Transaction = new Transaction({
			receiver: Address.fromString(input.data.to),
			value: Balance.egld(input.data.amount),
			gasPrice: new GasPrice((input.fee as unknown) as number),
			gasLimit: new GasLimit((input.feeLimit as unknown) as number),
			data: new TransactionPayload(input.data.memo),
			nonce: new Nonce(parseInt(input.nonce)),
		});
		await signer.sign(transaction);

		return new SignedTransactionData(transaction.getSignature().hex(), unsignedTransaction, transaction);
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
