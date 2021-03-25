import { Contracts } from "@arkecosystem/platform-sdk";

type KnownWalletRegistry = Record<string, Contracts.KnownWallet[]>;

export interface IKnownWalletService {
    syncAll(): Promise<void>;
    name(network: string, address: string): string | undefined;
    is(network: string, address: string): boolean;
    isExchange(network: string, address: string): boolean;
    isTeam(network: string, address: string): boolean;
}
