import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { v4 as uuidv4 } from "uuid";

import { SignedTransactionData } from "../dto";
import { createSignedTransactionData } from "../utils/crypto";
import { ClientService } from "./client";
import { IdentityService } from "./identity";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #client;
	readonly #identity;
	readonly #networkId;
	readonly #decimals;

	private constructor(opts: Contracts.KeyValuePair) {
		super();

		this.#client = opts.client;
		this.#identity = opts.identity;
		this.#networkId = opts.network.meta.networkId;
		this.#decimals = opts.decimals;
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<TransactionService> {
		return new TransactionService({
			...config.all(),
			client: await ClientService.__construct(config),
			identity: await IdentityService.__construct(config),
			decimals: config.get(Coins.ConfigKey.CurrencyDecimals),
		});
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Error("No mnemonic provided.");
			}

			const { address: senderAddress } = await this.#identity
				.address()
				.fromMnemonic(input.signatory.signingKey());
			const keyPair = await this.#identity.keyPair().fromMnemonic(input.signatory.signingKey());

			const { account_number, sequence } = (await this.#client.wallet(senderAddress)).raw();

			const signedTransaction = createSignedTransactionData(
				{
					msgs: [
						{
							type: "cosmos-sdk/MsgSend",
							value: {
								amount: [
									{
										amount: `${input.data.amount}`,
										denom: "umuon", // todo: make this configurable
									},
								],
								from_address: senderAddress,
								to_address: input.data.to,
							},
						},
					],
					chain_id: this.#networkId,
					fee: {
						amount: [
							{
								amount: String(5000), // todo: make this configurable or estimate it
								denom: "umuon", // todo: make this configurable
							},
						],
						gas: String(200000), // todo: make this configurable or estimate it
					},
					memo: "",
					account_number: String(account_number),
					sequence: String(sequence),
				},
				keyPair,
			);

			return new SignedTransactionData(uuidv4(), signedTransaction, signedTransaction, this.#decimals);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
