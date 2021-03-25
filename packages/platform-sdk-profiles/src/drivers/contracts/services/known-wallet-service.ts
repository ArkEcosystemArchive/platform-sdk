import { Contracts } from "@arkecosystem/platform-sdk";

import { pqueue } from "../helpers/queue";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { CoinService } from "./coin-service";

type KnownWalletRegistry = Record<string, Contracts.KnownWallet[]>;

export interface IKnownWalletService {
    syncAll(): Promise<void>;
    name(network: string, address: string): string | undefined;
    is(network: string, address: string): boolean;
    isExchange(network: string, address: string): boolean;
    isTeam(network: string, address: string): boolean;
}
