import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import TronWeb from "tronweb";

import { SignedTransactionData } from "../dto";
import { AddressService } from "./identity/address";
import { PrivateKeyService } from "./identity/private-key";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #connection: TronWeb;
	readonly #address: AddressService;
	readonly #privateKey: PrivateKeyService;

	private constructor({ config, peer }) {
		super();

		this.#connection = new TronWeb({
			fullHost: peer,
		});
		this.#address = new AddressService(config);
		this.#privateKey = new PrivateKeyService(config);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService({
			config,
			peer: Helpers.randomHostFromConfig(config, "full").host,
		});
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Error("No mnemonic provided.");
			}

			const { address: senderAddress } = await this.#address.fromMnemonic(input.signatory.signingKey());

			if (senderAddress === input.data.to) {
				throw new Exceptions.InvalidRecipientException("Cannot transfer TRX to the same account.");
			}

			let transaction = await this.#connection.transactionBuilder.sendTrx(
				input.data.to,
				BigNumber.make(input.data.amount).divide(1e8).times(1e6).toString(),
				senderAddress,
				1,
			);

			if (input.data.memo) {
				transaction = await this.#connection.transactionBuilder.addUpdateData(
					transaction,
					input.data.memo,
					"utf8",
				);
			}

			const response = await this.#connection.trx.sign(
				transaction,
				(await this.#privateKey.fromMnemonic(input.signatory.signingKey())).privateKey,
			);

			return new SignedTransactionData(response.txID, response, response);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
