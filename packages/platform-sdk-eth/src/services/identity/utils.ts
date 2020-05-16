import * as bip39 from "bip39";
import Wallet from "ethereumjs-wallet";
import hdkey from "ethereumjs-wallet/hdkey";

import { manifest } from "../../manifest";

export const createWallet = (passphrase: string, coinType: number): Wallet =>
	hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(passphrase)).derivePath(`m/44'/${coinType}'/0'/0/0`).getWallet();

export const getAddress = (wallet: Wallet): string => "0x" + wallet.getAddress().toString("hex").toUpperCase();
