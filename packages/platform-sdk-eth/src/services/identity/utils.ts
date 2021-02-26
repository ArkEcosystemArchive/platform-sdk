import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import Wallet, { hdkey } from "ethereumjs-wallet";

export const createWallet = (
	mnemonic: string,
	coinType: number,
	account: number,
	change: number,
	addressIndex: number,
): Wallet =>
	hdkey
		.fromMasterSeed(BIP39.toSeed(mnemonic))
		.derivePath(`m/44'/${coinType}'/${account}'/${change}/${addressIndex}`)
		.getWallet();

export const getAddress = (wallet: Wallet): string => "0x" + wallet.getAddress().toString("hex").toUpperCase();
