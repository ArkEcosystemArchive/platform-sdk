import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BN, Long, units, Zilliqa } from "@zilliqa-js/zilliqa";

import { SignedTransactionData } from "../dto";
import { convertZilToQa, getZilliqaVersion } from "../zilliqa";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #zilliqa: Zilliqa;
	readonly #version: number;

	private constructor(config: Coins.Config) {
		super();

		this.#zilliqa = new Zilliqa(Helpers.randomHostFromConfig(config));
		this.#version = getZilliqaVersion(config);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
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

		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "signatory");
		}

		const address = this.#zilliqa.wallet.addByMnemonic(input.signatory.signingKey());
		const { publicKey, bech32Address } = this.#zilliqa.wallet.accounts[address];

		if (bech32Address !== input.signatory.address()) {
			throw new Exceptions.Exception(
				`Sender address (${input.signatory.address()}) must match signer address (${bech32Address})`,
			);
		}

		const amount = convertZilToQa(input.data.amount);
		const fee = units.toQa(input.fee, units.Units.Li).toString();
		const signedData = {
			address,
			recipient: input.data.to,
			amount,
			fee,
			timestamp: DateTime.make(),
		};

		const transaction = this.#zilliqa.transactions.new({
			version: this.#version,
			pubKey: publicKey,
			toAddr: input.data.to,
			amount: new BN(convertZilToQa(input.data.amount)),
			gasPrice: new BN(units.toQa(input.fee, units.Units.Li)),
			gasLimit: Long.fromNumber(input.feeLimit),
			data: input.data.memo,
			nonce: new BN(input.nonce).toNumber(),
		});

		const signedTransaction = await this.#zilliqa.wallet.signWith(transaction, address, true);
		const broadcastData = JSON.stringify({ ...signedTransaction.payload, version: this.#version });

		return new SignedTransactionData(signedTransaction.hash, signedData, broadcastData);
	}
}
