import { Managers } from "@arkecosystem/crypto";

export const applyCryptoConfiguration = ({ crypto, status }): void => {
	Managers.configManager.setConfig(crypto);
	Managers.configManager.setHeight(status.height);
};
