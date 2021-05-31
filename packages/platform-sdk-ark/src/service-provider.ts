import { Managers } from "@arkecosystem/crypto";
import { Coins, Contracts, Helpers, IoC } from "@arkecosystem/platform-sdk";

import { container } from "./container";
import * as Services from "./services";

export class ServiceProvider extends IoC.ServiceProvider {
	public async make(): Promise<Coins.CoinServices> {
		config.set("NETWORK_CONFIGURATION", await ServiceProvider.retrieveNetworkConfiguration(config));

		return this.bindServices(await this.makeServices(Services), container);
	}

	private static async retrieveNetworkConfiguration(config: Coins.Config): Promise<{ crypto; peer; status }> {
		const http: Contracts.HttpClient = config.get<Contracts.HttpClient>(Coins.ConfigKey.HttpClient);

		let peer: string = Helpers.randomHostFromConfig(config);

		const [crypto, status] = await Promise.all([
			http.get(`${peer}/node/configuration/crypto`),
			http.get(`${peer}/node/syncing`),
		]);

		const dataCrypto = crypto.json().data;
		const dataStatus = status.json().data;

		if (dataCrypto.network.client.token !== config.get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Error(`Failed to connect to ${peer} because it is on another network.`);
		}

		Managers.configManager.setConfig(dataCrypto);
		Managers.configManager.setHeight(dataStatus.height);

		return { crypto: dataCrypto, peer, status: dataStatus };
	}
}
