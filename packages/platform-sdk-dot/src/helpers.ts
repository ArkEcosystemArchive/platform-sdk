import { Coins, Helpers } from "@arkecosystem/platform-sdk";
import { ApiPromise } from "@polkadot/api";
import { HttpProvider } from "@polkadot/rpc-provider";

export const createRpcClient = async (config: Coins.Config): Promise<ApiPromise> => {
	const provider = new HttpProvider(Helpers.randomHostFromConfig(config, "full").host);

	const api = await ApiPromise.create({ provider });
	await api.isReady;

	return api;
};
