import { Contracts } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { EntityAggregate } from "./entity-aggregate";

export class EntityResignationAggregate extends EntityAggregate {
	public async all(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("all", "resign", query);
	}

	public async businesses(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("business", "resign", query);
	}

	public async delegates(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("delegate", "resign", query);
	}

	public async plugins(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("plugin", "resign", query);
	}

	public async corePlugins(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("corePlugin", "resign", query);
	}

	public async desktopWalletPlugins(
		query: Contracts.ClientPagination = {},
	): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("desktopWalletPlugin", "resign", query);
	}
}
