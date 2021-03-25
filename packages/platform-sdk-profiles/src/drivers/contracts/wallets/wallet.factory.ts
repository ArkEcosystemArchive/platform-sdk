import { Coins } from "@arkecosystem/platform-sdk";
import { decrypt, encrypt } from "bip38";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";

import { Profile } from "../profiles/profile";
import { Wallet } from "./wallet";
import { ReadWriteWallet, WalletData } from "./wallet.models";

export interface IWalletFactory {
    fromMnemonic(coin: undefined, network: undefined, mnemonic: undefined, useBIP39: undefined, useBIP44: undefined): Promise<ReadWriteWallet>;
    fromAddress(coin: undefined, network: undefined, address: undefined): Promise<ReadWriteWallet>;
    fromPublicKey(coin: undefined, network: undefined, publicKey: undefined): Promise<ReadWriteWallet>;
    fromPrivateKey(coin: undefined, network: undefined, privateKey: undefined): Promise<ReadWriteWallet>;
    fromAddressWithLedgerPath(coin: undefined, network: undefined, address: undefined, path: undefined): Promise<ReadWriteWallet>;
    fromMnemonicWithEncryption(coin: undefined, network: undefined, mnemonic: undefined, password: undefined): Promise<ReadWriteWallet>;
    fromWIF(coin: undefined, network: undefined, wif: undefined): Promise<ReadWriteWallet>;
    fromWIFWithEncryption(coin: undefined, network: undefined, wif: undefined, password: undefined): Promise<ReadWriteWallet>;
}
