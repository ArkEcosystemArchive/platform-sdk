import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import Wallet, { hdkey } from "ethereumjs-wallet";

export const createWallet = (mnemonic: string, coinType: number): Wallet =>
	hdkey.fromMasterSeed(BIP39.toSeed(mnemonic)).derivePath(`m/44'/${coinType}'/0'/0/0`).getWallet();

export const getAddress = (wallet: Wallet): string => "0x" + wallet.getAddress().toString("hex").toUpperCase();
