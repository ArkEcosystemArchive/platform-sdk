import { Coins, IoC } from "@arkecosystem/platform-sdk";

import * as Services from "./services";

export class ServiceProvider extends IoC.AbstractServiceProvider implements IoC.IServiceProvider {
	public async make(): Promise<Coins.CoinServices> {
		return this.compose(Services, container);
	}
}
