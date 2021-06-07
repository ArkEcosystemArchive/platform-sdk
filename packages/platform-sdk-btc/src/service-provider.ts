import { Coins, IoC } from "@arkecosystem/platform-sdk";
import { BindingType } from "./constants";

import * as Services from "./services";
import { AddressFactory } from "./services/address.factory";

export class ServiceProvider extends IoC.AbstractServiceProvider implements IoC.IServiceProvider {
	public async make(container: IoC.Container): Promise<void> {
		container.singleton(BindingType.AddressFactory, AddressFactory);

		return this.compose(Services, container);
	}
}
