import { Managers } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export const retrieveCryptoConfiguration = async (config: Coins.Config): Promise<{ crypto; peer; status }> => {
	const http: Contracts.HttpClient = config.get<Contracts.HttpClient>("httpClient");

	let peer: string;
	try {
		peer = config.get<string>("peer");
	} catch {
		peer = `${Arr.randomElement(config.get<string[]>("network.networking.hosts"))}/api`;
	}

	const crypto: any = (await http.get(`${peer}/node/configuration/crypto`)).json();
	Managers.configManager.setConfig(crypto.data);

	const status: any = (await http.get(`${peer}/node/syncing`)).json();
	Managers.configManager.setHeight(status.data.height);

	return { crypto, peer, status };
};

export const applyCryptoConfiguration = ({ crypto, status }): void => {
	Managers.configManager.setConfig(crypto.data);
	Managers.configManager.setHeight(status.data.height);
};
