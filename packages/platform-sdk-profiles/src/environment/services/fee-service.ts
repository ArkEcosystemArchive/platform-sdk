import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueue } from "../../helpers/queue";
import { DataRepository } from "../../repositories/data-repository";
import { container } from "../container";
import { makeCoin } from "../container.helpers";
import { Identifiers } from "../container.models";
import { CoinService } from "./coin-service";

export class FeeService {
	readonly #dataRepository: DataRepository = new DataRepository();

	public all(coin: string, network: string): Contracts.TransactionFees {
		const result: Contracts.TransactionFees | undefined = this.#dataRepository.get(`${coin}.${network}.fees`);

		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin}.${network}.fees] have not been synchronized yet. Please call [syncFees] before using this method.`,
			);
		}

		return result;
	}

	public findByType(coin: string, network: string, type: string): Contracts.TransactionFee {
		return this.all(coin, network)[type];
	}

	public async sync(coin: string, network: string): Promise<void> {
		const instance: Coins.Coin = await makeCoin(coin, network);

		this.#dataRepository.set(`${coin}.${network}.fees`, await instance.fee().all(30));
	}

	public async syncAll(): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of container.get<CoinService>(Identifiers.CoinService).entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(coin, network));
			}
		}

		await pqueue(promises);
	}
}
