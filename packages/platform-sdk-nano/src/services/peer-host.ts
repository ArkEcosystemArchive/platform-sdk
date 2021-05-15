import { Coins } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";

export const getPeerFromConfig = (config: Coins.Config): string => {
	try {
		return config.get<string>("peer");
	} catch {
		return Arr.randomElement(config.get<string[]>("network.networking.hosts"));
	}
};
