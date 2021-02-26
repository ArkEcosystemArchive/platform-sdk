import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { wallet } from "@cityofzion/neon-js";

export const createWallet = (input: string) => new wallet.Account(input);

export const deriveWallet = (mnemonic: string, coinType: number, account: number, change: number, index: number) =>
	createWallet(BIP44.deriveChild(mnemonic, { coinType, account, change, index }).privateKey!.toString("hex"));

export const deriveKeyPair = (input: string) => {
	const { publicKey, privateKey } = createWallet(input);

	return { publicKey, privateKey };
};
