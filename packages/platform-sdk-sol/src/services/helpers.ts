import { Coins, Helpers } from "@arkecosystem/platform-sdk";
import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { derivePath, getPublicKey } from "ed25519-hd-key";

export const postGraphql = async (config: Coins.ConfigRepository, query: string): Promise<Record<string, any>> =>
	(
		await config
			.get<HttpClient>(Coins.ConfigKey.HttpClient)
			.post(Helpers.randomHostFromConfig(config, "archival"), { query })
	).json().data;

export const derivePrivateKey = (mnemonic: string, account: number, index: number, slip44: number): Buffer =>
	derivePath(`m/44'/${slip44}'/${account}'/${index}'`, BIP39.toSeed(mnemonic).toString("hex")).key;

export const derivePublicKey = (privateKey: Buffer): Buffer => getPublicKey(privateKey, false);
