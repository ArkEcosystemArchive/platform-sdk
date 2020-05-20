import { Utils } from "@arkecosystem/platform-sdk";
import * as bip39 from "bip39";
import Wallet from "ethereumjs-wallet";
import hdkey from "ethereumjs-wallet/hdkey";

export const createWallet = (passphrase: string, coinType: number): Wallet =>
	hdkey
		.fromMasterSeed(bip39.mnemonicToSeedSync(Utils.BIP39.normalize(passphrase)))
		.derivePath(`m/44'/${coinType}'/0'/0/0`)
		.getWallet();

export const getAddress = (wallet: Wallet): string => "0x" + wallet.getAddress().toString("hex").toUpperCase();
