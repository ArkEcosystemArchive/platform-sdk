import { Utils } from "@arkecosystem/platform-sdk";
import { wallet } from "@cityofzion/neon-js";

import { manifest } from "../../manifest";

export const createWallet = (input: string) => new wallet.Account(input);

export const deriveWallet = (passphrase: string, index = 0) =>
	createWallet(
		Utils.BIP44.deriveChild(passphrase, { coinType: manifest.crypto.slip44, index }).privateKey!.toString("hex"),
	);

export const deriveKeyPair = (input: string) => {
	const { publicKey, privateKey } = createWallet(input);

	return { publicKey, privateKey };
};
