import { Managers } from "@arkecosystem/crypto";
import { Coins, Helpers, IoC } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { Bindings } from "./contracts";
import * as Services from "./services";

@IoC.injectable()
export class ServiceProvider extends IoC.AbstractServiceProvider implements IoC.IServiceProvider {
	public async make(container: IoC.Container): Promise<Coins.CoinServices> {
		await this.#retrieveNetworkConfiguration();

		return this.compose(Services, container);
	}

	async #retrieveNetworkConfiguration(): Promise<void> {
		const http: HttpClient = this.config().get<HttpClient>(Coins.ConfigKey.HttpClient);

		let peer: string = Helpers.randomHostFromConfig(this.config());

		const [crypto, status] = await Promise.all([
			http.get(`${peer}/node/configuration/crypto`),
			http.get(`${peer}/node/syncing`),
		]);

		const dataCrypto = crypto.json().data;
		const dataStatus = status.json().data;

		if (dataCrypto.network.client.token !== this.config().get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Error(`Failed to connect to ${peer} because it is on another network.`);
		}

		Managers.configManager.setConfig(dataCrypto);
		Managers.configManager.setHeight(dataStatus.height);

		if (this.config().missing(Bindings.Crypto)) {
			this.config().set(Bindings.Crypto, dataCrypto);
		}

		if (this.config().missing(Bindings.Height)) {
			this.config().set(Bindings.Height, dataStatus.height);
		}
	}
}
