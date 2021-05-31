import { Coins, IoC } from "@arkecosystem/platform-sdk";

import { container } from "./container";
import * as Services from "./services";

export class ServiceProvider extends IoC.AbstractServiceProvider {
	public async make(): Promise<Coins.CoinServices> {
		return this.bindServices(await this.makeServices(Services), container);
	}
}
