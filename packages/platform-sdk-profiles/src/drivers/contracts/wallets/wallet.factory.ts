import { IReadWriteWallet } from "./wallet";

export interface IWalletFactory {
    fromMnemonic(coin: undefined, network: undefined, mnemonic: undefined, useBIP39: undefined, useBIP44: undefined): Promise<IReadWriteWallet>;
    fromAddress(coin: undefined, network: undefined, address: undefined): Promise<IReadWriteWallet>;
    fromPublicKey(coin: undefined, network: undefined, publicKey: undefined): Promise<IReadWriteWallet>;
    fromPrivateKey(coin: undefined, network: undefined, privateKey: undefined): Promise<IReadWriteWallet>;
    fromAddressWithLedgerPath(coin: undefined, network: undefined, address: undefined, path: undefined): Promise<IReadWriteWallet>;
    fromMnemonicWithEncryption(coin: undefined, network: undefined, mnemonic: undefined, password: undefined): Promise<IReadWriteWallet>;
    fromWIF(coin: undefined, network: undefined, wif: undefined): Promise<IReadWriteWallet>;
    fromWIFWithEncryption(coin: undefined, network: undefined, wif: undefined, password: undefined): Promise<IReadWriteWallet>;
}
