import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../../../helpers/queue";
import { DataRepository } from "../../../repositories/data-repository";
import { IFeeService, IProfile } from "../../../contracts";
import { injectable } from "inversify";

@injectable()
export class FeeService implements IFeeService {
	readonly #dataRepository: DataRepository = new DataRepository();

	/** {@inheritDoc IFeeService.all} */
	public all(coin: Coins.Coin): Contracts.TransactionFees {
		const result: Contracts.TransactionFees | undefined = this.#dataRepository.get(coin.uuid());

		if (result === undefined) {
			throw new Error(
				`The fees for [${coin.uuid()}] have not been synchronized yet. Please call [syncFees] before using this method.`,
			);
		}

		return result;
	}

	/** {@inheritDoc IFeeService.findByType} */
	public findByType(coin: Coins.Coin, type: string): Contracts.TransactionFee {
		return this.all(coin)[type];
	}

	/** {@inheritDoc IFeeService.sync} */
	public async sync(coin: Coins.Coin): Promise<void> {
		this.#dataRepository.set(coin.uuid(), await coin.fee().all());
	}

	/** {@inheritDoc IFeeService.syncAll} */
	public async syncAll(profile: IProfile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(profile.coins().get(coin, network)));
			}
		}

		await pqueueSettled(promises);
	}
}
