import { Coins } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";
export declare const getNetworkID: (config: Coins.ConfigRepository) => string;
export declare const getNetworkConfig: (config: Coins.ConfigRepository) => bitcoin.networks.Network;
