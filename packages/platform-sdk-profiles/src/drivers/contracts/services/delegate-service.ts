import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../helpers/queue";
import { DataRepository } from "../repositories/data-repository";
import { ReadOnlyWallet } from "../wallets/read-only-wallet";
import { container } from "../../../environment/container";
import { makeCoin } from "../../../environment/container.helpers";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "./coin-service";

export interface IDelegateService {
    all(coin: string, network: string): ReadOnlyWallet[];
    findByAddress(coin: string, network: string, address: string): ReadOnlyWallet;
    findByPublicKey(coin: string, network: string, publicKey: string): ReadOnlyWallet;
    findByUsername(coin: string, network: string, username: string): ReadOnlyWallet;
    sync(coin: string, network: string): Promise<void>;
    syncAll(): Promise<void>;
}
