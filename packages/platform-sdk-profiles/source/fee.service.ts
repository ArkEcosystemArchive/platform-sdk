import { Coins, Services } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "./helpers/queue";
import { DataRepository } from "./data.repository";
import { IFeeService, IProfile } from "./contracts";
import { injectable } from "inversify";

@injectable()
export class FeeService implements IFeeService {
	readonly #dataRepository: DataRepository = new DataRepository();

	/** {@inheritDoc IFeeService.all} */
	public all(coin: string, network: string): Services.TransactionFees {
		const result: Services.TransactionFees | undefined = this.#dataRepository.get(`${coin}.${network}.fees`);

		if (result === undefined) {
			throw new Error(
				`The fees for [${coin}.${network}] have not been synchronized yet. Please call [syncFees] before using this method.`,
			);
		}

		return result;
	}

	/** {@inheritDoc IFeeService.findByType} */
	public findByType(coin: string, network: string, type: string): Services.TransactionFee {
		return this.all(coin, network)[type];
	}

	/** {@inheritDoc IFeeService.sync} */
	public async sync(profile: IProfile, coin: string, network: string): Promise<void> {
		const instance: Coins.Coin = profile.coins().set(coin, network);

		// @TODO: remove this in a refactor
		/* istanbul ignore next */
		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}

		this.#dataRepository.set(`${coin}.${network}.fees`, await instance.fee().all());
	}

	/** {@inheritDoc IFeeService.syncAll} */
	public async syncAll(profile: IProfile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(profile, coin, network));
			}
		}

		await pqueueSettled(promises);
	}
}
