import { WalletExportOptions } from "../profiles/profile";
import { IReadWriteWallet } from "../wallets/wallet";

export interface IWalletRepository {
    all(): Record<string, IReadWriteWallet>;
    first(): IReadWriteWallet;
    last(): IReadWriteWallet;
    allByCoin(): Record<string, Record<string, IReadWriteWallet>>;
    keys(): string[];
    values(): IReadWriteWallet[];
    importByMnemonic(mnemonic: string, coin: string, network: string): Promise<IReadWriteWallet>;
    importByAddress(address: string, coin: string, network: string): Promise<IReadWriteWallet>;
    importByAddressList(addresses: string[], coin: string, network: string): Promise<IReadWriteWallet[]>;
    importByAddressWithLedgerPath(address: string, coin: string, network: string, path: string): Promise<IReadWriteWallet>;
    importByMnemonicWithEncryption(mnemonic: string, coin: string, network: string, password: string): Promise<IReadWriteWallet>;
    importByPublicKey(coin: string, network: string, publicKey: string): Promise<IReadWriteWallet>;
    importByPrivateKey(coin: string, network: string, privateKey: string): Promise<IReadWriteWallet>;
    importByWIF(coin: undefined, network: undefined, wif: undefined): Promise<IReadWriteWallet>;
    importByWIFWithEncryption(coin: undefined, network: undefined, wif: undefined, password: undefined): Promise<IReadWriteWallet>;
    generate(coin: string, network: string): Promise<{ mnemonic: string; wallet: IReadWriteWallet }>;
    restore(struct: Record<string, any>): Promise<IReadWriteWallet>;
    findById(id: string): IReadWriteWallet;
    findByAddress(address: string): IReadWriteWallet | undefined;
    findByPublicKey(publicKey: string): IReadWriteWallet | undefined;
    findByCoin(coin: string): IReadWriteWallet[];
    findByCoinWithNetwork(coin: string, network: string): IReadWriteWallet[];
    findByAlias(alias: string): IReadWriteWallet | undefined;
    update(id: string, data: { alias?: string }): void;
    has(id: string): boolean;
    forget(id: string): void;
    flush(): void;
    count(): number;
    toObject(options: WalletExportOptions): Record<string, object>;
    sortBy(column: string, direction: "asc" | "desc"): IReadWriteWallet[];
}
