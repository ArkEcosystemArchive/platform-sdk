import { Coins } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";

export const getNetworkID = (config: Coins.Config): string =>
	config.get<Coins.NetworkManifest>("network").id.split(".")[1];

export const getNetworkConfig = (config: Coins.Config): bitcoin.networks.Network => {
	if (getNetworkID(config) === "livenet") {
		return bitcoin.networks.bitcoin;
	}

	return bitcoin.networks.testnet;
};
