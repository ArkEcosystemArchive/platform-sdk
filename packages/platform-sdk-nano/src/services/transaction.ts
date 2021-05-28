import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { computeWork } from "nanocurrency";
import { block, tools } from "nanocurrency-web";

import { SignedTransactionData } from "../dto";
import { deriveAccount } from "./identity/helpers";
import { NanoClient } from "./rpc";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #client: NanoClient;

	public constructor(config: Coins.Config) {
		super();

		this.#client = new NanoClient(config);
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		const { address, privateKey } = deriveAccount(input.signatory.signingKey());
		const { balance, representative, frontier } = await this.#client.accountInfo(address, { representative: true });

		const data = {
			walletBalanceRaw: balance,
			fromAddress: input.signatory.address(),
			toAddress: input.data.to,
			representativeAddress: representative,
			frontier,
			amountRaw: tools.convert(input.data.amount, "NANO", "RAW"),
			work: (await computeWork(frontier))!,
		};
		const signedData = { ...data, timestamp: DateTime.make() };
		const broadcastData = block.send(data, privateKey);

		return new SignedTransactionData(broadcastData.signature, signedData, broadcastData);
	}
}
