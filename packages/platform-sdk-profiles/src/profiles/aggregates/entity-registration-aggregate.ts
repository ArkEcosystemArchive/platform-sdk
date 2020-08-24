import { Contracts } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { EntityAggregate } from "./entity-aggregate";

export class EntityRegistrationAggregate extends EntityAggregate {
	public async all(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("all", "register", query);
	}

	public async businesses(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("business", "register", query);
	}

	public async delegates(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("delegate", "register", query);
	}

	public async plugins(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("plugin", "register", query);
	}

	public async corePlugins(query: Contracts.ClientPagination = {}): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("corePlugin", "register", query);
	}

	public async desktopWalletPlugins(
		query: Contracts.ClientPagination = {},
	): Promise<ExtendedTransactionDataCollection> {
		return this.aggregate("desktopWalletPlugin", "register", query);
	}
}
