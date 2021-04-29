import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { wallet } from "@cityofzion/neon-js";

export const createWallet = (input: string): any => new wallet.Account(input);

export const deriveWallet = (mnemonic: string, coinType: number, account: number, change: number, index: number) => {
	const privateKey: string = BIP44.deriveChild(mnemonic, { coinType, account, change, index }).privateKey!.toString("hex");

	console.log({ coinType, account, change, index, privateKey, mnemonic });

	return createWallet(privateKey);
}

export const deriveKeyPair = (input: string) => {
	const { publicKey, privateKey } = createWallet(input);

	return { publicKey, privateKey };
};
