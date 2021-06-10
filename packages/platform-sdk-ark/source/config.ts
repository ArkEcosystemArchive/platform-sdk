import { Managers } from "@arkecosystem/crypto";

export const applyCryptoConfiguration = ({ crypto, height }): void => {
	Managers.configManager.setConfig(crypto);
	Managers.configManager.setHeight(height);
};
