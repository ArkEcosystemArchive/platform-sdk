import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
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

export class TransactionService extends Services.AbstractTransactionService {
	readonly #provider: ProxyProvider;

	private constructor(peer: string) {
		super();

		this.#provider = new ProxyProvider(peer);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(Helpers.randomHostFromConfig(config));
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
			timestamp: DateTime.make(),
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
}
