import { Coins, Contracts, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { computeWork } from "nanocurrency";
import { block, tools } from "nanocurrency-web";

import { SignedTransactionData } from "../dto";
import { deriveAccount } from "./identity/helpers";
import { NanoClient } from "./rpc";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #client: NanoClient;
	readonly #decimals: number;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#client = new NanoClient(config);
		this.#decimals = config.get(Coins.ConfigKey.CurrencyDecimals);
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		const { address, privateKey } = deriveAccount(input.signatory.signingKey());
		const { balance, representative, frontier } = await this.#client.accountInfo(address, { representative: true });

		const data = {
			walletBalanceRaw: balance,
			fromAddress: input.signatory.address(),
			toAddress: input.data.to,
			representativeAddress: representative,
			frontier,
			amountRaw: tools.convert(input.data.amount.toString(), "NANO", "RAW"),
			work: (await computeWork(frontier))!,
		};
		const signedData = { ...data, timestamp: DateTime.make() };
		const broadcastData = block.send(data, privateKey);

		return new SignedTransactionData(broadcastData.signature, signedData, broadcastData, this.#decimals);
	}
}
