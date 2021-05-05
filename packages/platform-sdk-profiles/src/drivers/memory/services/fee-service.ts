import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../../../helpers/queue";
import { DataRepository } from "../../../repositories/data-repository";
import { IFeeService } from "../../../contracts";
import { injectable } from "inversify";
import { State } from "../../../environment/state";

@injectable()
export class FeeService implements IFeeService {
	readonly #dataRepository: DataRepository = new DataRepository();

	/** {@inheritDoc IFeeService.all} */
	public all(coin: string, network: string): Contracts.TransactionFees {
		const result: Contracts.TransactionFees | undefined = this.#dataRepository.get(`${coin}.${network}.fees`);

		if (result === undefined) {
			throw new Error(
				`The fees for [${coin}.${network}] have not been synchronized yet. Please call [syncFees] before using this method.`,
			);
		}

		return result;
	}

	/** {@inheritDoc IFeeService.findByType} */
	public findByType(coin: string, network: string, type: string): Contracts.TransactionFee {
		return this.all(coin, network)[type];
	}

	/** {@inheritDoc IFeeService.sync} */
	public async sync(coin: Coins.Coin): Promise<void> {
		this.#dataRepository.set(`${coin.uuid()}.fees`, await coin.fee().all());
	}

	/** {@inheritDoc IFeeService.syncAll} */
	public async syncAll(): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const coin of State.profile().coins().values()) {
			promises.push(() => this.sync(coin));
		}

		await pqueueSettled(promises);
	}
}
