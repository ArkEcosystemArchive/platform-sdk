import { Contracts } from "@arkecosystem/platform-sdk";

import {
	ClientService,
	FeeService,
	IdentityService,
	LedgerService,
	LinkService,
	MessageService,
	PeerService,
	TransactionService,
} from "./services";

export class Factory extends Contracts.AbstractFactory {
	public static async construct(options: Contracts.FactoryOptions): Promise<Factory> {
		return new Factory({
			services: {
				client: await ClientService.construct(options.services.client),
				fee: await FeeService.construct(options.services.fee),
				identity: await IdentityService.construct(options.services.identity),
				ledger: await LedgerService.construct(options.services.ledger),
				link: await LinkService.construct(options.services.link),
				message: await MessageService.construct(options.services.message),
				peer: await PeerService.construct(options.services.peer),
				transaction: await TransactionService.construct(options.services.transaction),
			},
		});
	}

	public async destruct(): Promise<void> {
		await this.options.services.client.destruct();
		await this.options.services.fee.destruct();
		await this.options.services.identity.destruct();
		await this.options.services.ledger.destruct();
		await this.options.services.link.destruct();
		await this.options.services.message.destruct();
		await this.options.services.peer.destruct();
		await this.options.services.transaction.destruct();
	}
}
