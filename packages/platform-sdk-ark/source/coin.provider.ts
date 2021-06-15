import { Managers } from "@arkecosystem/crypto";
import { Coins, Helpers, IoC } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { BindingType } from "./coin.contract";
import { Services } from "./coin.services";
import { MultiSignatureSigner } from "./multi-signature.signer";

@IoC.injectable()
export class ServiceProvider extends IoC.AbstractServiceProvider implements IoC.IServiceProvider {
	public async make(container: IoC.Container): Promise<void> {
		await this.#retrieveNetworkConfiguration(container);

		if (container.missing(BindingType.MultiSignatureSigner)) {
			container.singleton(BindingType.MultiSignatureSigner, MultiSignatureSigner);
		}

		return this.compose(Services, container);
	}

	async #retrieveNetworkConfiguration(container: IoC.Container): Promise<void> {
		const http: HttpClient = container.get<HttpClient>(IoC.BindingType.HttpClient);

		let peer: string = Helpers.randomHostFromConfig(this.configRepository);

		const [crypto, status] = await Promise.all([
			http.get(`${peer}/node/configuration/crypto`),
			http.get(`${peer}/node/syncing`),
		]);

		const dataCrypto = crypto.json().data;
		const dataStatus = status.json().data;

		if (dataCrypto.network.client.token !== this.configRepository.get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Error(`Failed to connect to ${peer} because it is on another network.`);
		}

		Managers.configManager.setConfig(dataCrypto);
		Managers.configManager.setHeight(dataStatus.height);

		if (container.missing(BindingType.Crypto)) {
			container.constant(BindingType.Crypto, dataCrypto);
		}

		if (container.missing(BindingType.Height)) {
			container.constant(BindingType.Height, dataStatus.height);
		}
	}
}
