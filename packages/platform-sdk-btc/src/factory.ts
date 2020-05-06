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
		const merge = (options: Contracts.FactoryOptions, service: string) => ({
			network: options.network,
			peer: options.peer,
			...(options.services[service] || {}),
		});

		return new Factory({
			services: {
				client: await ClientService.construct(merge(options, "client")),
				fee: await FeeService.construct(merge(options, "fee")),
				identity: await IdentityService.construct(merge(options, "identity")),
				ledger: await LedgerService.construct(merge(options, "ledger")),
				link: await LinkService.construct(merge(options, "link")),
				message: await MessageService.construct(merge(options, "message")),
				peer: await PeerService.construct(merge(options, "peer")),
				transaction: await TransactionService.construct(merge(options, "transaction")),
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
