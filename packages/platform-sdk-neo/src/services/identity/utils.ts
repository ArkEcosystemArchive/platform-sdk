import { BIP44 } from "@arkecosystem/platform-sdk-support";
import { wallet } from "@cityofzion/neon-js";

export const createWallet = (input: string) => new wallet.Account(input);

export const deriveWallet = (passphrase: string, coinType: number, index = 0) =>
	createWallet(BIP44.deriveChild(passphrase, { coinType, index }).privateKey!.toString("hex"));

export const deriveKeyPair = (input: string) => {
	const { publicKey, privateKey } = createWallet(input);

	return { publicKey, privateKey };
};
