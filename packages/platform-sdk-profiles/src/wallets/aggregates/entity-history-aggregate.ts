import { ExtendedTransactionData } from "../../dto/transaction";
import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { transformTransactionData, transformTransactionDataCollection } from "../../dto/transaction-mapper";
import { ReadWriteWallet } from "../wallet.models";

export class EntityHistoryAggregate {
	readonly #wallet: ReadWriteWallet;

	public constructor(wallet: ReadWriteWallet) {
		this.#wallet = wallet;
	}

	/**
	 * @TODO
	 *
	 * This is currently limited to pull 100 transactions.
	 * This should be sufficient for some time but should eventually aggregate all transactions.
	 *
	 * @param {string} registrationId
	 * @returns {Promise<ExtendedTransactionData[]>}
	 * @memberof EntityHistoryAggregate
	 */
	public async all(registrationId: string): Promise<ExtendedTransactionData[]> {
		const registrations = [transformTransactionData(this.#wallet, await this.#wallet.client().transaction(registrationId))]
		const updates = await this.aggregate(registrationId, "resign")
		const resignations = await this.aggregate(registrationId, "update")

		return [
			...registrations,
			...updates.items(),
			...resignations.items(),
		];
	}

	private async aggregate(
		registrationId: string,
		entityAction: string
	): Promise<ExtendedTransactionDataCollection> {
		return transformTransactionDataCollection(
			this.#wallet,
			await this.#wallet.client().transactions({
				// @ts-ignore - TODO: We need to expand the properties that are allowed to be passed to be transaction search methods.
				entityAction,
				asset:{registrationId},
			})
		);
	}
}
