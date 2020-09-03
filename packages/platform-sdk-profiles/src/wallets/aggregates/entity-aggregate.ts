import { Contracts } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { transformTransactionDataCollection } from "../../dto/transaction-mapper";
import { ReadWriteWallet } from "../wallet.models";

export class EntityAggregate {
	readonly #wallet: ReadWriteWallet;

	public constructor(wallet: ReadWriteWallet) {
		this.#wallet = wallet;
	}

	public registrations(type: number, subType?: number | undefined, query: Contracts.ClientPagination = {}) {
		return this.aggregate(type, subType, "register", query);
	}

	public resignations(type: number, subType?: number | undefined, query: Contracts.ClientPagination = {}) {
		return this.aggregate(type, subType, "resign", query);
	}

	public updates(type: number, subType?: number | undefined, query: Contracts.ClientPagination = {}) {
		return this.aggregate(type, subType, "update", query);
	}

	protected async aggregate(
		entityType: number,
		entitySubType: number | undefined,
		entityAction: string | undefined,
		query: Contracts.ClientPagination,
	): Promise<ExtendedTransactionDataCollection> {
		return transformTransactionDataCollection(
			this.#wallet,
			await this.#wallet.client().transactions({
				...query,
				// @ts-ignore - TODO: We need to expand the properties that are allowed to be passed to be transaction search methods.
				entityType,
				entitySubType,
				entityAction,
				senderPublicKey: this.#wallet.publicKey(),
			}),
		);
	}
}
