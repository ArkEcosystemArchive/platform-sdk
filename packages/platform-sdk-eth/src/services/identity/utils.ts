import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import * as bip39 from "bip39";
import Wallet from "ethereumjs-wallet";
import hdkey from "ethereumjs-wallet/hdkey";

export const createWallet = (passphrase: string, coinType: number): Wallet =>
	hdkey
		.fromMasterSeed(bip39.mnemonicToSeedSync(BIP39.normalize(passphrase)))
		.derivePath(`m/44'/${coinType}'/0'/0/0`)
		.getWallet();

export const getAddress = (wallet: Wallet): string => "0x" + wallet.getAddress().toString("hex").toUpperCase();
