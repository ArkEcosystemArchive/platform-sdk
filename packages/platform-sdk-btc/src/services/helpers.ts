import { Coins, Networks } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";

export const getNetworkID = (config: Coins.ConfigRepository): string =>
	config.get<Networks.NetworkManifest>("network").id.split(".")[1];

export const getNetworkConfig = (config: Coins.ConfigRepository): bitcoin.networks.Network => {
	if (getNetworkID(config) === "livenet") {
		return bitcoin.networks.bitcoin;
	}

	return bitcoin.networks.testnet;
};
