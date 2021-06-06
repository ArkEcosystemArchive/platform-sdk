import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { createHash } from "crypto";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import fetch from "node-fetch";
import { TextDecoder, TextEncoder } from "util";

import { SignedTransactionData } from "../dto";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #networkId: string;
	readonly #peer: string;
	readonly #ticker: string;
	readonly #decimals: number;

	private constructor({ networkId, peer, ticker, decimals }) {
		super();

		this.#networkId = networkId;
		this.#peer = peer;
		this.#ticker = ticker;
		this.#decimals = decimals;
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<TransactionService> {
		return new TransactionService({
			networkId: config.get<string>("network.meta.networkId"),
			peer: Helpers.randomHostFromConfig(config),
			ticker: config.get<string>(Coins.ConfigKey.CurrencyTicker),
			decimals: config.get(Coins.ConfigKey.CurrencyDecimals),
		});
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
			}

			const { client, signatureProvider } = this.#getClient(input.signatory.signingKey());

			const transfer = await client.transact(
				{
					actions: [
						{
							account: "eosio.token",
							name: "transfer",
							authorization: [
								{
									actor: input.signatory.address(),
									permission: "active",
								},
							],
							data: {
								from: input.signatory.address(),
								to: input.data.to,
								quantity: `${input.data.amount} ${this.#ticker}`,
								memo: input.data.memo,
							},
						},
					],
				},
				{
					blocksBehind: 3,
					expireSeconds: 30,
					broadcast: false,
					sign: false,
				},
			);

			const keys: string[] = await signatureProvider.getAvailableKeys();
			transfer.requiredKeys = keys;
			transfer.chainId = this.#networkId;

			const signatures = transfer.signatures || null;
			const transaction = await signatureProvider.sign(transfer);

			if (signatures) {
				transaction.signatures = transaction.signatures.concat(signatures);
			}

			return new SignedTransactionData(
				createHash("sha256").update(transaction.serializedTransaction).digest("hex"),
				{ ...transaction, timestamp: DateTime.make() },
				transaction,
				this.#decimals,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	#getClient(privateKey: string) {
		const signatureProvider: JsSignatureProvider = new JsSignatureProvider([privateKey]);

		return {
			client: new Api({
				rpc: new JsonRpc(this.#peer, { fetch }),
				signatureProvider,
				// @ts-ignore - this started to error out of nowhere when building
				textEncoder: new TextEncoder(),
				// @ts-ignore - this started to error out of nowhere when building
				textDecoder: new TextDecoder(),
			}),
			signatureProvider,
		};
	}
}
