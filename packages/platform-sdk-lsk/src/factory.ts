import { Contracts } from "@arkecosystem/platform-sdk";

import {
	ClientService,
	IdentityService,
	LinkService,
	MessageService,
	PeerService,
	TransactionService,
} from "./services";

export class Factory extends Contracts.AbstractFactory {
	public static async construct(options: Contracts.FactoryOptions): Promise<Factory> {
		return new Factory({
			services: {
				message: await MessageService.construct(options.services.message),
				client: await ClientService.construct(options.services.client),
				identity: await IdentityService.construct(options.services.identity),
				link: await LinkService.construct(options.services.link),
				peer: await PeerService.construct(options.services.peer),
				transaction: await TransactionService.construct(options.services.transaction),
			},
		});
	}

	public async destruct(): Promise<void> {
		await this.options.services.message.destruct();
		await this.options.services.client.destruct();
		await this.options.services.identity.destruct();
		await this.options.services.peer.destruct();
		await this.options.services.transaction.destruct();
	}
}
