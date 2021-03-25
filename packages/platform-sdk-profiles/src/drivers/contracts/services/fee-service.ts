import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { pqueueSettled } from "../helpers/queue";
import { DataRepository } from "../repositories/data-repository";
import { container } from "../../../environment/container";
import { makeCoin } from "../../../environment/container.helpers";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "./coin-service";


export interface IFeeService {
    all(coin: string, network: string): Contracts.TransactionFees;
    findByType(coin: string, network: string, type: string): Contracts.TransactionFee;
    sync(coin: string, network: string): Promise<void>;
    syncAll(): Promise<void>;
}
