import { Coins } from "@arkecosystem/platform-sdk";

import { DataRepository } from "../repositories/data-repository";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";

export interface ICoinService {
    all(): Record<string, Coins.Coin>;
    values(): Coins.Coin[];
    entries(): [string, string[]][];
    get(coin: string, network: string): Coins.Coin;
    push(coin: string, network: string, options: object, useForce: undefined): Promise<Coins.Coin>;
    has(coin: string, network: string): boolean;
}
