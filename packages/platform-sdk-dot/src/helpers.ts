import { Coins } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { ApiPromise } from "@polkadot/api";
import { HttpProvider } from "@polkadot/rpc-provider";

export const createRpcClient = async (config: Coins.Config): Promise<ApiPromise> => {
	const provider = new HttpProvider(Arr.randomElement(config.get<string[]>("network.networking.hosts")));

	const api = await ApiPromise.create({ provider });
	await api.isReady;

	return api;
}
