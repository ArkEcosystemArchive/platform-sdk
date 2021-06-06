import { Managers } from "@arkecosystem/crypto";
import { Coins, Helpers, IoC } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { Bindings } from "./contracts";
import * as Services from "./services";

@IoC.injectable()
export class ServiceProvider extends IoC.AbstractServiceProvider implements IoC.IServiceProvider {
	public async make(container: IoC.Container): Promise<Coins.CoinServices> {
		await this.#retrieveNetworkConfiguration(container);

		return this.compose(Services, container);
	}

	async #retrieveNetworkConfiguration(container: IoC.Container): Promise<void> {
		const http: HttpClient = container.get<HttpClient>(Coins.ConfigKey.HttpClient);

		let peer: string = Helpers.randomHostFromConfig(this.configRepository);

		const [crypto, status] = await Promise.all([
			http.get(`${peer}/node/configuration/crypto`),
			http.get(`${peer}/node/syncing`),
		]);

		const dataCrypto = crypto.json().data;
		const dataStatus = status.json().data;

		if (dataCrypto.network.client.token !== container.get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Error(`Failed to connect to ${peer} because it is on another network.`);
		}

		Managers.configManager.setConfig(dataCrypto);
		Managers.configManager.setHeight(dataStatus.height);

		if (container.missing(Bindings.Crypto)) {
			container.constant(Bindings.Crypto, dataCrypto);
		}

		if (container.missing(Bindings.Height)) {
			container.constant(Bindings.Height, dataStatus.height);
		}
	}
}
