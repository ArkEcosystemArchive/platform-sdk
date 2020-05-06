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
				client: await Factory.createService(ClientService, options, "client"),
				fee: await Factory.createService(FeeService, options, "fee"),
				identity: await Factory.createService(IdentityService, options, "identity"),
				ledger: await Factory.createService(LedgerService, options, "ledger"),
				link: await Factory.createService(LinkService, options, "link"),
				message: await Factory.createService(MessageService, options, "message"),
				peer: await Factory.createService(PeerService, options, "peer"),
				transaction: await Factory.createService(TransactionService, options, "peer"),
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

	private static async createService(
		klass: any,
		options: Contracts.FactoryOptions,
		service: string,
	): Promise<object> {
		return klass.construct({ network: options.network, peer: options.peer, ...options.services[service] });
	}
}
