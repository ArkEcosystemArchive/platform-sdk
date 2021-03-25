import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { sortBy, sortByDesc } from "@arkecosystem/utils";
import retry from "p-retry";
import { v4 as uuidv4 } from "uuid";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "../services/coin-service";
import { Profile } from "../profiles/profile";
import { WalletExportOptions } from "../profiles/profile.models";
import { Wallet } from "../wallets/wallet";
import { WalletFactory } from "../wallets/wallet.factory";
import { ReadWriteWallet } from "../wallets/wallet.models";
import { DataRepository } from "./data-repository";

export interface IWalletRepository {
    all(): Record<string, ReadWriteWallet>;
    first(): ReadWriteWallet;
    last(): ReadWriteWallet;
    allByCoin(): Record<string, Record<string, ReadWriteWallet>>;
    keys(): string[];
    values(): ReadWriteWallet[];
    importByMnemonic(mnemonic: string, coin: string, network: string): Promise<ReadWriteWallet>;
    importByAddress(address: string, coin: string, network: string): Promise<ReadWriteWallet>;
    importByAddressList(addresses: string[], coin: string, network: string): Promise<ReadWriteWallet[]>;
    importByAddressWithLedgerPath(address: string, coin: string, network: string, path: string): Promise<ReadWriteWallet>;
    importByMnemonicWithEncryption(mnemonic: string, coin: string, network: string, password: string): Promise<ReadWriteWallet>;
    importByPublicKey(coin: string, network: string, publicKey: string): Promise<ReadWriteWallet>;
    importByPrivateKey(coin: string, network: string, privateKey: string): Promise<ReadWriteWallet>;
    importByWIF(coin: undefined, network: undefined, wif: undefined): Promise<ReadWriteWallet>;
    importByWIFWithEncryption(coin: undefined, network: undefined, wif: undefined, password: undefined): Promise<ReadWriteWallet>;
    generate(coin: string, network: string): Promise<{ mnemonic: string; wallet: ReadWriteWallet }>;
    restore(struct: Record<string, any>): Promise<ReadWriteWallet>;
    findById(id: string): ReadWriteWallet;
    findByAddress(address: string): ReadWriteWallet | undefined;
    findByPublicKey(publicKey: string): ReadWriteWallet | undefined;
    findByCoin(coin: string): ReadWriteWallet[];
    findByCoinWithNetwork(coin: string, network: string): ReadWriteWallet[];
    findByAlias(alias: string): ReadWriteWallet | undefined;
    update(id: string, data: { alias?: string }): void;
    has(id: string): boolean;
    forget(id: string): void;
    flush(): void;
    count(): number;
    toObject(options: WalletExportOptions): Record<string, object>;
    sortBy(column: string, direction: "asc" | "desc"): ReadWriteWallet[];
}
