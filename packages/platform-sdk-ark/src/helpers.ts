import { Coins, Helpers } from "@arkecosystem/platform-sdk";

export const getPeerFromConfig = (config: Coins.Config): string =>
	`${Helpers.randomHostFromConfig(config, "full").host}/api`;
