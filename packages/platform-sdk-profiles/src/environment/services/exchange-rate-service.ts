import { Contracts } from "@arkecosystem/platform-sdk";

import { DataRepository } from "../../repositories/data-repository";

export class ExchangeRateService {
	readonly #dataRepository: DataRepository = new DataRepository();

	public all(source: string, target: string): Contracts.TransactionFees {
		//
	}

	public async sync(source: string, target: string): Promise<void> {
		//
	}

	public async syncAll(coins: Record<string, string[]>): Promise<void> {
		//
	}
}
