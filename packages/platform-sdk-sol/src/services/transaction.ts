import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { Account, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { derivePrivateKey, derivePublicKey } from "./identity/helpers";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #config: Coins.ConfigRepository;
	readonly #client: Connection;
	readonly #slip44: number;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#config = config;
		this.#client = new Connection(this.#host());
		this.#slip44 = config.get<number>("network.constants.slip44");
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "signatory");
		}
		const amount = Helpers.toRawUnit(input.data.amount, this.#config).toNumber();

		const transaction = new Transaction();
		transaction.recentBlockhash = (await this.#client.getRecentBlockhash()).blockhash;
		transaction.feePayer = new PublicKey(input.signatory.publicKey());

		transaction.add(
			SystemProgram.transfer({
				fromPubkey: transaction.feePayer,
				toPubkey: new PublicKey(input.data.to),
				lamports: amount,
			}),
		);

		const signedTransaction = this.#sign(
			transaction,
			derivePrivateKey(input.signatory.signingKey(), 0, 0, this.#slip44),
		);

		return new SignedTransactionData(
			uuidv4(),
			{
				from: input.signatory.address(),
				to: input.data.to,
				amount,
				timestamp: DateTime.make(),
			},
			signedTransaction.toString("hex"),
			this.#config.get(Coins.ConfigKey.CurrencyTicker),
		);
	}

	#sign(transaction: Transaction, privateKey: Buffer): Buffer {
		transaction.sign(new Account(derivePublicKey(privateKey)));

		return transaction.serialize({ requireAllSignatures: false, verifySignatures: false });
	}

	#host(): string {
		return `${Helpers.randomHostFromConfig(this.#config)}/api`;
	}
}
