import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { ProxyProvider, UserSigner } from "@elrondnetwork/erdjs";

import { SignedTransactionData } from "../dto";
import {
	Address,
	Balance,
	GasLimit,
	GasPrice,
	Mnemonic,
	Transaction,
	TransactionPayload,
	UserSecretKey
} from "@elrondnetwork/erdjs/out";

export class TransactionService implements Contracts.TransactionService {
	readonly #provider: ProxyProvider;

	private constructor(peer: string) {
		this.#provider = new ProxyProvider(peer);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		try {
			return new TransactionService(config.get<string>("peer"));
		} catch {
			return new TransactionService(Arr.randomElement(config.get<string[]>("network.networking.hosts")));
		}
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.sign.mnemonic === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "sign.mnemonic");
		}

		if (input.fee === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "fee");
		}

		if (input.feeLimit === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "feeLimit");
		}

		const unsignedTransaction = {
			sender: input.from,
			receiver: input.data.to,
			value: new BigVal(input.data.amount, "coins"),
			gasPrice: (input.fee as unknown) as number,
			gasLimit: (input.feeLimit as unknown) as number,
			data: input.data.memo,
		};

		const mnemonic: Mnemonic = Mnemonic.fromString(input.sign.mnemonic);
		const secretKey: UserSecretKey = mnemonic.deriveKey(0);
		const signer: UserSigner = new UserSigner(secretKey);

		const tx: Transaction = new Transaction(
			{
				receiver: Address.fromString(input.data.to),
				value: Balance.egld(input.data.amount),
				gasPrice: new GasPrice((input.fee as unknown) as number),
				gasLimit: new GasLimit((input.feeLimit as unknown) as number),
				data: new TransactionPayload(input.data.memo),
			});
		// tx.setNonce(account.nonce); // TODO Do we need specify this? If so we will need to sync account first, or receive it via param
		await signer.sign(tx);

		return new SignedTransactionData(tx.getSignature().hex(), unsignedTransaction, tx);
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
