import { ReadWriteWallet } from "./wallet";

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
